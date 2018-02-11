$(document).ready(function() {
	let $keys = Array.from($('.dBody .fls'));
	let $accountInfo = Array.from($('.dBody .dfv'))
		.map((v, i) => ({k: $keys[i].textContent, v: v.textContent}))
		.filter(e => /[A-Za-z0-9]+/.exec(e.v));

	const $tabs = $('.tre');
	const tabs = ["Payments In Progress", "Payments", "Deposits", "Transfers", "Activity", "Payees", "Documents"];
	const getTable = i => Array.from($('table > tbody > tr', $tabs[i])).map(r => Array.from(r.cells));

	$('body > form > table').remove();
	$('body > form').append(`
		<div class="container">
        	<div class="card">
	        	<div class="card-body">
					<h5 class="card-title">Account Information</h5>
					<ul class="list-group">
						${$accountInfo.map(e => `<li class="list-group-item">
							<strong>${e.k}:</strong> ${e.v}
						</li>`).join('')}					
					</ul>
 					<a href="#" class="btn btn-primary">Generate Account Statement</a>				        	
				</div>	
			</div>
			
			${tabs.map((t, i) => {
				const table = getTable(i);
				
				return `<div class="card">
					<div class="card-body">
						<h5 class="card-title">${t}</h5>
						<table class="table">
							<thead class="thead-light">
								${table[0].map(e => `<th scope="col">${e.childNodes[0].textContent}</th>`).join('')}
							</thead>
							<tbody>
								${table.splice(1).map(e => `<tr>
									${e.map(f => `<td>${f.innerText}</td>`).join('')}
								</tr>`).join('')}
							</tbody>
						</table>
					</div>			
				</div>`
			}).join('')}
		</div>`);
});