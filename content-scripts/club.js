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

	const individualsData = Array.from($('table > tbody tr', $tabs[1]))
		.map(r => Array.from(r.cells))
		.filter(a => a.length > 1);
	const payeesData = Array.from($('table > tbody tr', $tabs[2]))
		.map(r => Array.from(r.cells));
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
	const individuals = {
		headers: Array.from(individualsData[0]).map(e => e.childNodes[0].textContent),
		content: individualsData
			.slice(1)
			.map(e => e.map(f => f.innerText))
	};
	const payees = {
		// headers: cherryPick(Array.from(payeesData[0]).map(e => e.childNodes[0].textContent), [1, 5]),
		headers: Array.from(payeesData[0])
			.filter((v, i) => [1, 5].includes(i))
			.map(e => e.childNodes[0].textContent),
		content: payeesData
			.slice(1)
			.map(e => e
				.filter((v, i) => [3, 7].includes(i))
				.map(f => f.innerText))
	};
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