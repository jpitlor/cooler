chrome.runtime.sendMessage({from: 'cooler-content-script'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-theme-injected') {
		fetch(chrome.extension.getURL('/templates/add-payment.hbs'))
			.then(r => r.text())
			.then(d => inject(Handlebars.compile(d)));
	}
});

function pad(n) {
	return n < 10 ? '0' + n : '' + n;
}

function inject(template) {
	const today = new Date();
	const todayDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

	$('body > form > table').hide();
	$('body > form').append(template({todayDate}));

	const $theirButtons = $('input');
	$('.btn').each(function(i) {
		$(this).on('click', function() {
			$theirButtons[i].click()
		});
	});
}