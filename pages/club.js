$(document).ready(function() {
	$.ajax(chrome.runtime.getURL("templates/club.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	const $keys = Array.from($('.dBody .fls'));
	const $myInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({...p, [$keys[i].textContent]: c.textContent}) : p, {});
	const $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);

	const $tabs = $('.tre');
	const $accounts = Array.from($('table > tbody tr', $tabs[0]))
		.map(r => Array.from(r.cells)
			.splice(2)
			.map(d => d.innerText))
		.filter(a => a.length > 1);
	const $individuals = Array.from($('table > tbody tr', $tabs[1]))
		.map(r => Array.from(r.cells))
		.filter(a => a.length > 1);
	const $payees = Array.from($('table > tbody tr', $tabs[2]))
		.map(r => Array.from(r.cells));
	const $documents = Array.from($('table > tbody tr', $tabs[3]))
		.map(r => Array.from(r.cells).map(d => d.innerText))
		.filter(a => a.length > 1);

	$('body > form > table').remove();
	$('body > form').append(template({
		announcements: $announcements,
		info: $myInfo,
		accounts: {
			headers: $accounts[0],
			content: $accounts.slice(1)
		},
		individuals: {
			headers: Array.from($individuals[0]).map(e => e.childNodes[0].textContent),
			content: $individuals.slice(1).map(e => e.innerText)
		},
		payees: {
			headers: Array.from($payees[0]).map(e => e.childNodes[0].textContent),
			content: $payees.slice(1).map(e => e.innerText)
		},
		documents: {
			headers: $documents[0],
			content: $documents.slice(1)
		}
	}));
}
