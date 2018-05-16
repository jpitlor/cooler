chrome.runtime.sendMessage({from: 'cooler-content-script'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-theme-injected') {
		fetch(chrome.extension.getURL('/templates/home.hbs'))
			.then(r => r.text())
			.then(d => inject(Handlebars.compile(d), request.theme));
	}
});

function inject(template, theme) {
	const $keys = Array.from($('.dBody .fls'));
	const $myOrgs = Array.from($('.tre > table > tbody')[0].children);

	const announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	const myInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({
			...p,
			[$keys[i].textContent]: c.textContent
		}) : p, {});
	const orgs = {
		columns: Array.from($myOrgs[0].children)
			.filter((v, i) => [0, 1, 3, 4].includes(i))
			.map(c => c.childNodes[0].textContent),
		content: $myOrgs.slice(1)
			.map(c => Array.from(c.children)
				.filter((v, i) => [0, 1, 3, 4].includes(i))
				.map(e => e.innerHTML))
	};

	const $table = $('body > form > table');
	$table.hide();
	// $('.navbar-nav')[0].children[0].className += " active";
	$('.maincontent').append(template({announcements, myInfo, orgs, theme}));

	const $theirButtons = $('input', $table).slice(1);
	$('.btn').slice(1).each(function(i) {
		$(this).on('click', function() {
			$theirButtons[i].click();
		})
	});
}
