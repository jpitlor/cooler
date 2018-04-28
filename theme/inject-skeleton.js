chrome.storage.sync.get({
	theme: 'purdue'
}, function({theme}) {
	fetch(chrome.extension.getURL('/templates/home.hbs'))
		.then(r => r.text())
		.then(d => inject(Handlebars.compile(d)));
});

function injectHeader(template) {
	const isBrowserPage = window.location.href === "https://www.coolfaces.net/COOLPUWL/MyPages/Browsers.html";

	const favicon = chrome.extension.getURL('/icons/favicon.ico');
	// const name = isBrowserPage ? null : $('#PageHeader__UserStatusLbl')[0].innerText.substr("Hello ".length);
	const name = "";

	$('title').html("COOL - Central Office Online");
	$('head').append(`<link rel="shortcut icon" type="image/x-icon" href="${favicon}" />`);
	$('body').prepend(template({name}));
}
