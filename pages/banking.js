chrome.runtime.sendMessage({from: 'cooler-content-script'}, () => {
	fetch(chrome.extension.getURL('/templates/banking.hbs'))
		.then(r => r.text())
		.then(d => inject(Handlebars.compile(d)));
});

function inject(template) {
	let $keys = Array.from($('.dBody .fls'));
	let $accountInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? {
			...p,
			[$keys[i].textContent]: c.textContent
		} : p, {});
	const $tables = $('.tre'); // this has to be here for efficiency

	const $theirButtons = $('.prbbc input');
	const $myButtons = $('.bmd-btn-icon');

	$myButtons.each(console.log);

	$('body > form > table').hide();
	$('body > form').append(template({
		info: $accountInfo,
		paymentsIP: getTable(0, $tables),
		payments: getTable(1, $tables),
		deposits: getTable(2, $tables),
		transfers: getTable(3, $tables),
		activities: getTable(4, $tables),
		payees: getTable(5, $tables),
		unattachedDocs: getTable(6, $tables)
	}));
}

function getTable(i, $tables) {
	const table = Array.from($('table > tbody > tr', $tables[i])).map(r => Array.from(r.cells));

	if (i === 4) return {
		headers: Array.from(table[0]).map(e => e.childNodes[0].textContent).slice(1),
		content: table.slice(1).map(e => e.slice(1).map(c => c.innerText)).filter(t => t.length > 1)
	};

	if (i === 5) return {
		headers: Array.from(table[0]).map(e => e.childNodes[0].textContent),
		content: table.slice(1).map(e => e.slice(2).map(c => c.innerText))
	};

	return {
		headers: Array.from(table[0]).map(e => e.childNodes[0].textContent),
		content: table.slice(1).map(e => e.map(c => c.innerText))
	};
}
