// This is much easier than putting the whole theme in every match
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-content-script') {
		const js = ["vendor/jquery.min.js", "vendor/popper.min.js", "vendor/bootstrap.min.js", "vendor/icons.min.js",
			"vendor/handlebars.js", "theme.js"];
		js.forEach(file => chrome.tabs.executeScript({file}, () => {
			const css = ["vendor/bootstrap.min.css", "theme.css"];
			css.forEach(file => chrome.tabs.insertCSS({file}, () => sendResponse()));
		}));

		return true;
	}
});