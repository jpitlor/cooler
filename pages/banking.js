$(document).ready(function() {
	$.ajax(chrome.runtime.getURL("templates/banking.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	let $keys = Array.from($('.dBody .fls'));
	let $accountInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? {...p, [$keys[i].textContent]: c.textContent} : p, {});

	const $tabs = $('.tre');
	const tabs = ["Payments In Progress", "Payments", "Deposits", "Transfers", "Activity", "Payees", "Documents"];
	const getTable = i => Array.from($('table > tbody > tr', $tabs[i])).map(r => Array.from(r.cells));

	$('body > form > table').remove();
	$('body > form').append(template({
		info: $accountInfo,
		tabs: tabs.map((t, i) => {
			return getGoodTable(getTable(i), t)
		})
	}));
}

function getGoodTable(table, tab) {
	if (tab !== "Activity") return {
		title: tab,
		table: {
			headers: Array.from(table[0]).map(e => e.childNodes[0].textContent),
			content: table.slice(1).map(e => e.map(c => c.innerText))
		}
	};

	return {
		title: tab,
		table: {
			headers: Array.from(table[0]).map(e => e.childNodes[0].textContent).slice(1),
			content: table.slice(1).map(e => e.slice(1).map(c => c.innerText)).filter(t => t.length > 1)
		}
	};
}
