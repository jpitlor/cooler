$(document).ready(function () {
	let $keys = Array.from($('.dBody .fls'));
	let $myInfo = Array.from($('.dBody .dfv'))
		.map((v, i) => ({k: $keys[i].textContent, v: v.textContent}))
		.filter(e => /[A-Za-z0-9]+/.exec(e.v));
	let $myOrgs = Array.from($('.tre > table > tbody')[0].children);
	let $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	let $createPDFButton = $('#IndividualTabContainer_IndividualInOrganizationsTabPanel_IndividualInOrganizationsPDFButton')[0];
	let logOutLink = $('#PageHeader__SignIn')[0].href;
	let name = $('#PageHeader__UserStatusLbl')[0].innerText.substr("Hello ".length);
	let scripts = document.getElementsByTagName('script');

	$('body > form > table').remove();

	$('body').append(`
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<a class="navbar-brand" href="#">COOL (Central Office Online)</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" 
					data-target="#navbarText" aria-controls="navbarText" 
					aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="/COOLPUWL/Individual/ShowIndividualPage.aspx">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/COOLPUWL/MyPages/Browsers.html">Browser Support</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-toggle="modal" data-target="#aboutModal" href="#">About</a>
					</li>
				</ul>
				<span class="navbar-text">Hello, ${name}!</span>
				<a class="nav-link nav-item" href="${logOutLink}">Log Out</a>
			</div>
		</nav>
		<div id="aboutModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">About</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<!--<div class="row">-->
							<!--<div class="col">-->
								<!--<img src="../Images/COOL.jpg" />-->
							<!--</div>-->
						<!--</div>-->
					
						<p>This extension was made out of frustration and love by Jordan Pitlor, the treasurer (at the time
						of development) of the Disney Appreciation Club.</p>
						
						<p>The source can be viewed <a href="https://github.com/piticent123/cooler">here</a>, and if
						something isn't working (or you want to say hi), I can be contacted 
						<a href="mailto:jpitlor@gmail.com">here</a></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>			
			</div>
		</div>
		
		<div class="container">
        	${$announcements.map(e => `<div class="alert alert-info alert-dismissible fade show" role="alert">
				${e}
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>`).join('')}
        	
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
										   href="${a.href}">${f.textContent}</a> 
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

	Array.from(scripts).forEach(node => document.body.appendChild(node));
});
