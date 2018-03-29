$(document).ready(function () {
	$.ajax(chrome.extension.getURL("/templates/edit-individual.hbs")).done(data => {
		inject(Handlebars.compile(data));
	});
});

function inject(template) {
	const $keys = Array.from($('.dBody .fls'));
	let $values = $('.dBody .dfv');
	const immutable = Array.from($values)
		.reduce((p, c, i) => /[A-Za-z0-9]+/.exec(c.textContent) ? ({
			...p,
			[$keys[i].textContent]: c.textContent
		}) : p, {});
	const mutable = Array.from($values)
		.reduce((p, c, i) => $('input', c).length ? p.concat($keys[i].textContent) : p, []);

	$('body > form > table').hide();
	$('body > form').append(template({mutable, immutable}));
}