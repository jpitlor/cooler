fetch(chrome.extension.getURL('/vendor/purdue-brand.hbs'))
	.then(r => r.text())
	.then(d => injectHeader(Handlebars.compile(d)));

function injectHeader(template) {
	const isBrowserPage = window.location.href === "https://www.coolfaces.net/COOLPUWL/MyPages/Browsers.html";

	const footerText = isBrowserPage ? "" : $('.footer')[0].textContent;
	const logOutLink = isBrowserPage ? null : $('#PageHeader__SignIn')[0].href;
	const name = isBrowserPage ? null : $('#PageHeader__UserStatusLbl')[0].innerText.substr("Hello ".length);
	const favicon = chrome.extension.getURL('/favicon.ico');

	$('title').html("COOL - Central Office Online");
	$('head').append(`<link rel="shortcut icon" type="image/x-icon" href="${favicon}" />`);
	$('body').prepend(template({footerText, logOutLink, name}));

	chrome.runtime.sendMessage({from: 'cooler-theme-injected'});
}
