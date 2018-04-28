// This is much easier than putting the whole theme in every match.
// The downside is that the extension requests permissions to view/edit
// content on CoolFaces.net, but that was kinda implied anyway.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-content-script') {
		chrome.storage.sync.get({
			theme: 'purdue'
		}, function({theme}) {
			const files = ["/vendor/jquery.min.js", "/vendor/handlebars.js", "/theme/inject-skeleton.js",
				"/vendor/bootstrap.min.js", "/vendor/icons.min.js", "/vendor/popper.min.js", "/vendor/fonts.css",
				"/theme/theme.css",	`/vendor/${theme}-bootstrap.min.css`];

			files.reduce((promise, file) => promise.then(injectFile(file)), Promise.resolve([]));
		});
	}
});

function injectFile(file) {
	return new Promise(function(resolve, reject) {
		const fun = file.includes(".js") ? chrome.tabs.executeScript : chrome.tabs.insertCSS;
		fun({file}, resolve())
	});
}
