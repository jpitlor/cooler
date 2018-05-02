chrome.runtime.sendMessage({from: 'cooler-content-script'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-theme-injected') {
		fetch(chrome.extension.getURL('/templates/banking.hbs'))
			.then(r => r.text())
			.then(d => inject(Handlebars.compile(d)));
	}
});

function inject(template) {
	let $keys = Array.from($('.dBody .fls'));
	const info = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? {
			...p,
			[$keys[i].textContent]: c.textContent
		} : p, {});
	
	const $tables = $('.tre');
	const paymentsIPData = Array.from($('table > tbody > tr', $tables[0])).map(r => Array.from(r.cells));
	const paymentsData = Array.from($('table > tbody > tr', $tables[1])).map(r => Array.from(r.cells));
	const depositsData = Array.from($('table > tbody > tr', $tables[2])).map(r => Array.from(r.cells));
	const transfersData = Array.from($('table > tbody > tr', $tables[3])).map(r => Array.from(r.cells));
	const activitiesData = Array.from($('table > tbody > tr', $tables[4])).map(r => Array.from(r.cells));
	const payeesData = Array.from($('table > tbody > tr', $tables[5])).map(r => Array.from(r.cells));
	const unattachedDocsData = Array.from($('table > tbody > tr', $tables[6])).map(r => Array.from(r.cells));
	
	const paymentsIP = {
		headers: Array.from(paymentsIPData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 3, 4].includes(i)),
		content: paymentsIPData.slice(1).map(e => e
			.map(c => c.innerText)
			.filter((v, i) => [1, 3, 4].includes(i)))
	};
	const payments = {
		headers: Array.from(paymentsData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 4].includes(i)),
		content: paymentsData.slice(1).map(e => e
			.map(c => c.innerText)
			.filter((v, i) => [1, 2, 4].includes(i)))
	};
	const deposits = {
		headers: Array.from(depositsData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [0, 1, 3].includes(i)),
		content: depositsData.slice(1).map(e => e
			.map(c => c.innerText)
			.filter((v, i) => [0, 1, 3].includes(i)))
	};
	const transfers = {
		headers: Array.from(transfersData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [0, 2, 3, 5].includes(i)),
		content: transfersData.slice(1).map(e => e
			.map(c => c.innerText)
			.filter((v, i) => [0, 2, 3, 5].includes(i)))
	};
	const activities = {
		headers: Array.from(activitiesData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 4, 5, 8].includes(i)),
		content: activitiesData.slice(1).map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [1, 2, 4, 5, 8].includes(i)))
			.filter(t => t.length > 1)
	};
	const payees = {
		headers: Array.from(payeesData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 5].includes(i)),
		content: payeesData
			.slice(1)
			.map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [3, 7].includes(i)))
	};
	const unattachedDocs = {
		headers: Array.from(unattachedDocsData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [5, 6, 7, 8].includes(i)),
		content: unattachedDocsData
			.slice(1)
			.map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [5, 6, 7, 8].includes(i)))
	};

	$('body > form > table').hide();
	$('body > form').append(template({
		info, paymentsIP, payments, deposits, transfers, activities, payees, unattachedDocs
	}));

	const $theirButtons = $('.prbbc input');
	$('.bmd-btn-icon').each(function(i) {
		$(this).on('click', function() {
			$theirButtons[i].click()
		});
	});
}
