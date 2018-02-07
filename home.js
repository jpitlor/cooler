$(document).ready(function () {
	setTimeout(doStuff, 3000);
});

function doStuff() {
	let $keys = Array.from($('.dBody .fls'));
	let $myInfo = Array.from($('.dBody .dfv'))
		.map((v, i) => ({k: $keys[i].textContent, v: v.textContent}))
		.filter(e => /[A-Za-z0-9]+/.exec(e.v));

	let $myOrgs = Array.from($('.tre > table > tbody')[0].children);
	let $announcements = $('.pm')[0].textContent.split("\n").filter(s => s.length > 0);
	let name = "Jordan";

	$('body').html(`
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<a class="navbar-brand" href="#">COOL (Central Office Online)</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Browser Support</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">About</a>
					</li>
				</ul>
				<span class="navbar-text">
				Hello, ${name}!
				</span>
				<a class="nav-link nav-item" href="#">Log Out</a>
			</div>
		</nav>
		
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
								${e.textContent}
							</th>`).join('')}				
						</thead>
						<tbody>
							${$myOrgs.splice(1).map(e => `<tr>
								${Array.from(e.children).map(f => `<td>${f.textContent}</td>`).join('')}
							</tr>`).join('')}
						</tbody>        	
					</table>
				</div>	
			</div>
		</div>
`);
}
