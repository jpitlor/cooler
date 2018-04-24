function restoreOptions() {
	chrome.storage.sync.get({
		theme: 'purdue'
	}, function(items) {
		document.getElementById(items.theme).checked = true;
	});
}

function saveOptions() {
	const theme = Array.from(document.getElementsByName('theme')).reduce((p, c) => c.checked ? c.id : p, 'purdue');
	chrome.storage.sync.set({theme}, function() {
		// var status = document.getElementById('status');
		// status.textContent = 'Options saved.';
		// setTimeout(function() {
		// 	status.textContent = '';
		// }, 750);
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);