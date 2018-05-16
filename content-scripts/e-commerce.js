chrome.runtime.sendMessage({from: 'cooler-content-script'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-theme-injected') {
		fetch(chrome.extension.getURL('/templates/e-commerce.hbs'))
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
	const ordersIPData = Array.from($('table > tbody > tr', $tables[0])).map(r => Array.from(r.cells));
	const fulfilledOrdersData = Array.from($('table > tbody > tr', $tables[1])).map(r => Array.from(r.cells));
	const catalogItemsIPData = Array.from($('table > tbody > tr', $tables[2])).map(r => Array.from(r.cells));
	const catalogItemsData = Array.from($('table > tbody > tr', $tables[3])).map(r => Array.from(r.cells));
	const serializedData = Array.from($('table > tbody > tr', $tables[4])).map(r => Array.from(r.cells));
	const certificatesData = Array.from($('table > tbody > tr', $tables[5])).map(r => Array.from(r.cells));
	const shoppingCartData = Array.from($('table > tbody > tr', $tables[6])).map(r => Array.from(r.cells));
	const memberRequestsData = Array.from($('table > tbody > tr', $tables[7])).map(r => Array.from(r.cells));
	const membersData = Array.from($('table > tbody > tr', $tables[8])).map(r => Array.from(r.cells));
	const unattachedDocsData = Array.from($('table > tbody > tr', $tables[9])).map(r => Array.from(r.cells));

	const ordersIP = {
		headers: Array.from(ordersIPData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 3, 5].includes(i)),
		content: ordersIPData.slice(1).map(e => e
			.map(c => c.innerHTML)
			.filter((v, i) => [1, 2, 3, 5].includes(i)))
	};
	const fulfilledOrders = {
		headers: Array.from(fulfilledOrdersData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 4].includes(i)),
		content: fulfilledOrdersData.slice(1).map(e => e
			.map(c => c.innerText)
			.filter((v, i) => [2, 3, 5].includes(i)))
	};
	const catalogItemsIP = {
		headers: Array.from(catalogItemsIPData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 3, 6].includes(i)),
		content: catalogItemsIPData.slice(1).map(e => e
			.map(c => c.innerHTML)
			.filter((v, i) => [1, 2, 3, 6].includes(i)))
	};
	const catalogItems = {
		headers: Array.from(catalogItemsData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [2, 3, 4, 7].includes(i)),
		content: catalogItemsData.slice(1).map(e => e
			.map(c => c.innerHTML)
			.filter((v, i) => [4, 5, 6, 9].includes(i)))
	};
	const serialized = {
		headers: Array.from(serializedData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [0, 1, 3].includes(i)),
		content: serializedData.slice(1).map(e => e
			.map(c => c.innerText)
			.filter((v, i) => [0, 1, 3].includes(i)))
			.filter(t => t.length > 1)
	};
	const certificates = {
		headers: Array.from(certificatesData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [0, 1, 3].includes(i)),
		content: certificatesData
			.slice(1)
			.map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [0, 1, 3].includes(i)))
	};
	const shoppingCart = {
		headers: Array.from(shoppingCartData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 3, 4].includes(i)),
		content: shoppingCartData
			.slice(1)
			.map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [2, 3, 4, 5].includes(i)))
	};
	const memberRequests = {
		headers: Array.from(memberRequestsData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 2, 3].includes(i)),
		content: memberRequestsData
			.slice(1)
			.map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [1, 2, 3].includes(i)))
	};
	const members = {
		headers: Array.from(membersData[0])
			.map(e => e.childNodes[0].textContent)
			.filter((v, i) => [1, 3].includes(i)),
		content: membersData
			.slice(1)
			.map(e => e
				.map(c => c.innerText)
				.filter((v, i) => [1, 3].includes(i)))
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
	$('.maincontent').append(template({
		info, ordersIP, fulfilledOrders, catalogItemsIP, catalogItems, serialized, certificates, shoppingCart,
		memberRequests, members, unattachedDocs
	}));

	const $theirButtons = $('.prbbc input');
	$('.bmd-btn-icon').each(function(i) {
		$(this).on('click', function() {
			$theirButtons[i].click()
		});
	});
}
