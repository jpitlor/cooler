$(document).ready(function () {
	let $keys = Array.from($('.dBody .fls'));
	let $myInfo = Array.from($('.dBody .dfv'))
		.map((v, i) => ({k: $keys[i].textContent, v: v.textContent}))
		.filter(e => /[A-Za-z0-9]+/.exec(e.v));
	let $myOrgs = Array.from($('.tre > table > tbody')[0].children);
	let $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	let $createPDFButton = $('#IndividualTabContainer_IndividualInOrganizationsTabPanel_IndividualInOrganizationsPDFButton')[0];

	// let scripts = document.getElementsByTagName('script');

	$('body > form > table').remove();
	$('.navbar-nav')[0].children[0].className += " active";
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
					<h5 class="card-title">Your Information</h5>
					<ul class="list-group">
						${$myInfo.map(e => `<li class="list-group-item">
							<strong>${e.k}:</strong> ${e.v}
						</li>`).join('')}					
					</ul>
 					<a href="#" class="btn btn-primary">Edit</a>						        	
				</div>	
			</div>
        	
        	<div class="card">
	        	<div class="card-body">
					<h5 class="card-title">Your Organizations</h5>
					<table class="table">
						<thead class="thead-light">
							${Array.from($myOrgs[0].children).map(e => `<th scope="col">
								${e.childNodes[0].innerText}
							</th>`).join('')}				
						</thead>
						<tbody>
							${$myOrgs.splice(1).map(e => `<tr>
								${Array.from(e.children).map((f, i) => {
									let a = f.children[0];
									if (i !== 0) return `<td>${f.textContent}</td>`;
									
									return `<td>
										<a id="${a.id}" redirecturl="${a.redirecturl}"
										   href="${a.href}">
											${f.textContent.split(" ")
												.map(s => s === "SOGA" ? s : s[0].toUpperCase() + s.substr(1).toLowerCase())
												.join(" ")}</a> 
									</td>`							
								}).join('')}
							</tr>`).join('')}
						</tbody>        	
					</table>
					<input class="btn btn-primary" id="${$createPDFButton.id}" 
						   name="${$createPDFButton.name}" type="button" value="Create PDF Summary" />
				</div>	
			</div>
		</div>
	`);

	// Array.from(scripts).forEach(node => document.body.appendChild(node));
});
