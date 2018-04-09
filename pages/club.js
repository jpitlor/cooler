chrome.runtime.sendMessage({from: 'cooler-content-script'}, () => {
	fetch(chrome.extension.getURL('/templates/club.hbs'))
		.then(r => r.text())
		.then(d => inject(Handlebars.compile(d)));
});

function inject(template) {
	const $keys = Array.from($('.dBody .fls'));
	const $myInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({
			...p,
			[$keys[i].textContent]: c.textContent
		}) : p, {});
	const $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);

	const $tabs = $('.tre');
	const $accounts = Array.from($('table > tbody tr', $tabs[0]))
		.map(r => Array.from(r.cells))
		.filter(a => a.length === 13);
	$accounts.pop(); // There's an extra summary row
	const $individuals = Array.from($('table > tbody tr', $tabs[1]))
		.map(r => Array.from(r.cells))
		.filter(a => a.length > 1);
	const $payees = Array.from($('table > tbody tr', $tabs[2]))
		.map(r => Array.from(r.cells));
	const $documents = Array.from($('table > tbody tr', $tabs[3]))
		.map(r => Array.from(r.cells).map(d => d.innerText))
		.filter(a => a.length > 1);

	$('body > form > table').hide();
	$('body > form').append(template({
		announcements: $announcements,
		info: $myInfo,
		accounts: $accounts.slice(1).map(a => ({
			name: a[2].innerText.trim(),
			balance: a[12].innerText,
			bankHref: a[0].querySelector('a').href,
			storeHref: a[1].querySelector('a').href
		})),
		individuals: {
			headers: Array.from($individuals[0]).map(e => e.childNodes[0].textContent),
			content: $individuals.slice(1).map(e => e.map(f => f.innerText))
		},
		payees: {
			headers: Array.from($payees[0]).map(e => e.childNodes[0].textContent),
			content: $payees.slice(1).map(e => e.slice(2).map(f => f.innerText))
		},
		documents: {
			headers: $documents[0],
			content: $documents.slice(1).map(e => e.map(f => f.innerText))
		}
	}));
}
