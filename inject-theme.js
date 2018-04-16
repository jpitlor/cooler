// This is much easier than putting the whole theme in every match
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-content-script') {
		const files = ["vendor/jquery.min.js", "vendor/popper.min.js", "vendor/bootstrap.min.js", "vendor/icons.min.js",
			"vendor/handlebars.js", "vendor/bootstrap.min.css", "theme.css", "theme.js"];
		files.reduce((promise, file) => promise.then(inject(file)), Promise.resolve([])).then(sendResponse);

		return true;
	} else if (request.from === 'cooler-theme-injected') {
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, {from: 'cooler-theme-injected'})
		})
	}
});

function inject(file) {
	return new Promise(function(resolve, reject) {
		const fun = file.includes(".js") ? chrome.tabs.executeScript : chrome.tabs.insertCSS;
		fun({file}, resolve())
	});
}