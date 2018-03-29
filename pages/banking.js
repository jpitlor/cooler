$(document).ready(function () {
	$.ajax(chrome.runtime.getURL("templates/banking.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	let $keys = Array.from($('.dBody .fls'));
	let $accountInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? {
			...p,
			[$keys[i].textContent]: c.textContent
		} : p, {});
	const $tables = $('.tre'); // this has to be here for efficiency

	console.log($('.prbbc input'));
	// btn.src = "data:image/svg+xml;utf8,<svg class=\"svg-inline--fa fa-plus fa-w-14\" aria-hidden=\"true\" data-prefix=\"fal\" data-icon=\"plus\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" data-fa-i2svg=\"\"><path fill=\"currentColor\" d=\"M436 238H242V44c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v194H12c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h194v194c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12V274h194c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z\"/></svg>";
	// btn.className = 'btn btn-raised bmd-btn-icon';
	// btn.removeAttribute('onmouseover');
	// btn.removeAttribute('onmouseout');

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
