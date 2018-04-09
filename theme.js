fetch(chrome.extension.getURL('/theme.hbs'))
	.then(r => r.text())
	.then(d => injectHeader(Handlebars.compile(d)));

function injectHeader(template) {
	const isBrowserPage = window.location.href === "https://www.coolfaces.net/COOLPUWL/MyPages/Browsers.html";

	const footer = isBrowserPage ? "" : $('.footer')[0].textContent;
	const logOutLink = isBrowserPage ? null : $('#PageHeader__SignIn')[0].href;
	const name = isBrowserPage ? null : $('#PageHeader__UserStatusLbl')[0].innerText.substr("Hello ".length);

	$('title').html("COOL - Central Office Online");

	let $body = $('body');
	$body.addClass('bg-light');
	$body.prepend(template({footer, logOutLink, name}));
}
