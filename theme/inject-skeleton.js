chrome.storage.sync.get({
	theme: 'purdue'
}, function ({theme}) {
	Promise.all([
		fetch(chrome.extension.getURL(`/skeletons/${theme}.hbs`))
			.then(r => r.text())
			.then(Handlebars.compile),
		fetch(chrome.extension.getURL('/theme/themes.json'))
			.then(r => r.json())
			.then(j => j[theme])
	]).then(([d, t]) => injectHeader(d, t));
});

function injectHeader(template, theme) {
	const isBrowserPage = window.location.href === "https://www.coolfaces.net/COOLPUWL/MyPages/Browsers.html";

	const favicon = chrome.extension.getURL('/icons/favicon.ico');
	// const name = isBrowserPage ? null : $('#PageHeader__UserStatusLbl')[0].innerText.substr("Hello ".length);
	const name = "";

	$('title').html("COOL - Central Office Online");
	$('head').append(`<link rel="shortcut icon" type="image/x-icon" href="${favicon}" />`);
	$('body').prepend(template({name}));

	chrome.runtime.sendMessage({from: 'cooler-theme-injected', theme});
}
