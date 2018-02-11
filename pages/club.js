$(document).ready(function() {
	return;

	const $keys = Array.from($('.dBody .fls'));
	const $myInfo = Array.from($('.dBody .dfv'))
		.map((v, i) => ({k: $keys[i].textContent, v: v.textContent}))
		.filter(e => /[A-Za-z0-9]+/.exec(e.v));
	const $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);

	const $tabs = $('.tre');
	const $accounts = Array.from($('table > tbody tr', $tabs[0]))
		.map(r => Array.from(r.cells)
					   .splice(2)
					   .map(d => d.innerText))
		.filter(a => a.length > 1);
	const $individuals = Array.from($('table > tbody tr', $tabs[1]))
		.map(r => Array.from(r.cells))
		.filter(a => a.length > 1);
	const $payees = Array.from($('table > tbody tr', $tabs[2]))
		.map(r => Array.from(r.cells));
	const $documents = Array.from($('table > tbody tr', $tabs[3]))
		.map(r => Array.from(r.cells).map(d => d.innerText))
		.filter(a => a.length > 1);

	$('body > form > table').remove();
	$('body > form').append(`
		<div class="container">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Reminders</h5>
					<ul class="list-group">
						${$announcements.map(a => `<li class="list-group-item">${a}</li>`).join('')}
					</ul>
				</div>
			</div>
			
			<div class="card">
	        	<div class="card-body">
					<h5 class="card-title">Club Information</h5>
					<ul class="list-group">
						${$myInfo.map(e => `<li class="list-group-item">
							<strong>${e.k}:</strong> ${e.v}
						</li>`).join('')}					
					</ul>
 					<a href="#" class="btn btn-primary">E-Commerce Scan In</a>						        	
				</div>	
			</div>
        	
        	<div class="card">
				<div class="card-body">
				<h5 class="card-title">Accounts</h5>
					<table class="table">
						<thead class="thead-light">
							${$accounts[0].map(e => `<th scope="col">${e}</th>`).join('')}
						</thead>
						<tbody>
							${$accounts.splice(1).map(e => `<tr>
								${e.map(f => `<td>${f}</td>`).join('')}
							</tr>`).join('')}
						</tbody>        	
					</table>
				</div>        	
			</div>
			
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Board Members Registered With BOSO</h5>
					<table class="table">
						<thead class="thead-light">
							${$individuals[0].map(e => `<th scope="col">${e.childNodes[0].textContent}</th>`).join('')}
						</thead>
						<tbody>
							${$individuals.splice(1).map(e => `<tr>
								${e.map(f => `<td>${f.innerText}</td>`).join('')}
							</tr>`).join('')}
						</tbody>
					</table>
				</div>			
			</div>
	
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Payees</h5>
					<table class="table">
						<thead class="thead-light">
							${$payees[0].splice(1).map(e => `<th scope="col">${e.childNodes[0].textContent}</th>`).join('')}
						</thead>
						<tbody>
							${$payees.splice(1).map(e => `<tr>
								${e.splice(3).map(f => `<td>${f.innerText}</td>`).join('')}
							</tr>`).join('')}
						</tbody>
					</table>
				</div>			
			</div>

			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Documents</h5>
					<table class="table">
						<thead class="thead-light">
							${$documents[0].map(e => `<th scope="col">${e}</th>`).join('')}
						</thead>
						<tbody>
							${$documents.splice(1).map(e => `<tr>
								${e.map(f => `<td>${f}</td>`).join('')}
							</tr>`).join('')}
						</tbody>
					</table>
				</div>			
			</div>
		</div>`);
});