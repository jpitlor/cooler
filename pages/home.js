$(document).ready(function () {
	$.ajax(chrome.extension.getURL("/templates/home.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	let $keys = Array.from($('.dBody .fls'));
	let $myInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({
			...p,
			[$keys[i].textContent]: c.textContent
		}) : p, {});
	let $myOrgs = Array.from($('.tre > table > tbody')[0].children);
	let $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	let $createPDFButton = $('#IndividualTabContainer_IndividualInOrganizationsTabPanel_IndividualInOrganizationsPDFButton');

	$('body > form > table').remove();
	$('.navbar-nav')[0].children[0].className += " active";
	$('body > form').append(template({
		announcements: $announcements,
		myInfo: $myInfo,
		orgs: {
			columns: Array.from($myOrgs[0].children).map(c => c.childNodes[0].textContent),
			content: $myOrgs.slice(1).map(c => Array.from(c.children)).map(c => c.map(e => e.innerHTML))
		},
		pdfBtn: {
			id: $createPDFButton.attr('id'),
			consumers: $createPDFButton.attr('consumers'),
			name: $createPDFButton.attr('name')
		}
	}));
}

function downloadPDFSummary() {
	$.ajax({
		'method': 'POST',
		'url': 'https://www.coolfaces.net/COOLPUWL/Individual/ShowIndividualPage.aspx',
		'headers': {
			"Host": "www.coolfaces.net",
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			"Accept-Encoding": "gzip, deflate, br",
			"Referer": "https://www.coolfaces.net/COOLPUWL/Individual/ShowIndividualPage.aspx",
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": "5851",
			"Cookie": "Cool_IronspeedUserName=; Cool_IronspeedPassword=; Cool_IronspeedRememberName=False; Cool_IronspeedRememberPassword=False; ai_user=lXtuP|2018-02-07T23:06:27.971Z; ASP.NET_SessionId=ofkcwt55o4mirc3vvxumzz3b",
			"Connection": "keep-alive",
			"Upgrade-Insecure-Requests": "1"
		}
	})
}