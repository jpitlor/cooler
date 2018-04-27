// This is much easier than putting the whole theme in every match.
// The downside is that the extension requests permissions to view/edit
// content on CoolFaces.net, but that was kinda implied anyway.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-content-script') {
		chrome.storage.sync.get({
			theme: 'purdue'
		}, function({theme}) {
			const files = ["vendor/jquery.min.js", "vendor/popper.min.js", "vendor/bootstrap.min.js",
				"vendor/icons.min.js", "vendor/handlebars.js", "vendor/fonts.css", "theme/theme.css",
				`/vendor/${theme}-bootstrap.min.css`, "theme/theme.js"];

			files.reduce((promise, file) => promise.then(inject(file)), Promise.resolve([]))
				.then(() => fetch(chrome.extension.getURL(`/skeletons/${theme}.hbs`)))
				.then(skeleton => {
					chrome.tabs.query({active: true, currentWindow: true}, tabs => {
						chrome.tabs.sendMessage(tabs[0].id, {
							from: 'cooler-theme-injected'
						})
					})
				})
				.then(d => injectHeader(Handlebars.compile(d)))
				.then(sendResponse);
		});

		return true;
	} else if (request.from === 'cooler-theme-injected') {

	}
});

function inject(file) {
	return new Promise(function(resolve, reject) {
		const fun = file.includes(".js") ? chrome.tabs.executeScript : chrome.tabs.insertCSS;
		fun({file}, resolve())
	});
}

function injectHeader(template) {
	const isBrowserPage = window.location.href === "https://www.coolfaces.net/COOLPUWL/MyPages/Browsers.html";

	const favicon = chrome.extension.getURL('/icons/favicon.ico');
	const logOutLink = isBrowserPage ? null : $('#PageHeader__SignIn')[0].href;
	const name = isBrowserPage ? null : $('#PageHeader__UserStatusLbl')[0].innerText.substr("Hello ".length);

	$('title').html("COOL - Central Office Online");
	$('head').append(`<link rel="shortcut icon" type="image/x-icon" href="${favicon}" />`);
	$('body').prepend(template({logOutLink, name}));

	chrome.runtime.sendMessage({from: 'cooler-theme-injected'});
}
