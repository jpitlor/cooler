$(document).ready(function () {
	$.ajax(chrome.runtime.getURL("templates/browser-support.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	const rows = $('.MsoNormalTable tr');
	const support = [rows[2], rows[5], rows[7], rows[10]];
	const browsers = [rows[1], rows[4], rows[6], rows[9]].map((v, i) => {
		let picture = Array.from($('img', v)).pop();
		return {
			"img": picture.src,
			"name": picture.alt.replace(/ /g, ""),
			"support": support[i].innerHTML
		}
	});

	$('.WordSection1').remove();
	$('.navbar-nav')[0].children[1].className += " active";
	$('body').append(template({browsers}));
}
