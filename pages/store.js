chrome.runtime.sendMessage({from: 'cooler-content-script'}, () => {
	fetch(chrome.extension.getURL('/templates/store.hbs'))
		.then(r => r.text())
		.then(d => inject(Handlebars.compile(d)));
});

function inject(template) {

}