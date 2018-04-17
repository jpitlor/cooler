chrome.runtime.sendMessage({from: 'cooler-content-script'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'cooler-theme-injected') {

	}
});

function inject(template) {

}