$(document).ready(function () {
	$.ajax(chrome.extension.getURL("/templates/home.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	const $keys = Array.from($('.dBody .fls'));
	const myInfo = Array.from($('.dBody .dfv'))
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({
			...p,
			[$keys[i].textContent]: c.textContent
		}) : p, {});
	const announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	const pdfBtnId = 'IndividualTabContainer_IndividualInOrganizationsTabPanel_IndividualInOrganizationsPDFButton';
	const editInfoBtnId = 'IndividualDialogEditButton';
	const $myOrgs = Array.from($('.tre > table > tbody')[0].children);

	$('body > form > table').hide();
	$('.navbar-nav')[0].children[0].className += " active";
	$('body > form').append(template({
		announcements, myInfo, pdfBtnId, editInfoBtnId,
		orgs: {
			columns: Array.from($myOrgs[0].children).map(c => c.childNodes[0].textContent),
			content: $myOrgs.slice(1).map(c => Array.from(c.children)).map(c => c.map(e => e.innerHTML))
		}
	}));
}
