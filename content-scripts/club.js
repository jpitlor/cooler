chrome.runtime.sendMessage({from: 'cooler-content-script'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-theme-injected') {
		fetch(chrome.extension.getURL('/templates/club.hbs'))
			.then(r => r.text())
			.then(d => inject(Handlebars.compile(d)));
	}
});

function inject(template) {
	const $keys = Array.from($('.dBody .fls'));
	const $tabs = $('.tre');

	const documentsData = Array.from($('table > tbody tr', $tabs[3]))
		.map(r => Array.from(r.cells).map(d => d.innerText))
		.filter(a => a.length > 1);

	const announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	const info = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({
			...p,
			[$keys[i].textContent]: c.textContent
		}) : p, {});
	const accounts = Array.from($('table > tbody tr', $tabs[0]))
		.map(r => Array.from(r.cells))
		.filter(a => a.length === 13)
		.slice(1, -1)
		.map(a => ({
			name: a[2].innerText.trim(),
			balance: a[12].innerText,
			bankHref: a[0].querySelector('a').href,
			storeHref: a[1].querySelector('a').href
		}));
	const individuals = Array.from($('table > tbody tr', $tabs[1]))
		.map(r => Array.from(r.cells))
		.slice(1)
		.map(e => e
			.filter((v, i) => [0, 1, 3, 4].includes(i))
			.map(f => f.innerText));
	const payees = Array.from($('table > tbody tr', $tabs[2]))
		.slice(1)
		.map(r => Array.from(r.cells)
			.filter((v, i) => [3, 7].includes(i))
			.map(f => f.innerText))
		.map(n => [n[0].split("\n")[0], n[0].split("\n").pop(), n[1]])
	;
	const documents = {
		headers: documentsData[0],
		content: documentsData
			.slice(1)
			.map(e => e.map(f => f.innerText))
	};

	let $table = $('body > form > table');
	$table.remove();
	$('.maincontent').append(template({announcements, info, accounts, individuals, payees, documents}));

	const $theirButtons = $('input', $table);
	$('.btn').each(function(i) {
		$(this).on('click', function() {
			$theirButtons[i].click();
		})
	});
}