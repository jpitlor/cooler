$(document).ready(function () {
	setTimeout(doStuff, 3000);
});

function doStuff() {
	let name = "Jordan";

	const rows = $('.MsoNormalTable tr');
	const browsers = [rows[1], rows[4], rows[6], rows[9]].map(v => {
			let picture = $('img', v)[0];
			return {
				"img": picture.src,
				"name": picture.alt.replace(/ /g, "")
			}
		});
	const support = [rows[2], rows[5], rows[7], rows[10]];

	$('body').html(`
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<a class="navbar-brand" href="#">COOL (Central Office Online)</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a class="nav-link" href="/COOLPUWL/Individual/ShowIndividualPage.aspx">Home</a>
					</li>
					<li class="nav-item active">
						<a class="nav-link" href="/COOLPUWL/MyPages/Browsers.html">Browser Support</a>
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
			<div class="jumbotron">
				<h1 class="display-4">TooCOOL Browser Support</h1>
				<p class="lead">Having troubles viewing your online store? It may be because TooCOOL doesn't 
				support your browser.</p>
			</div>
	        
	        <div id="browsers">
				${browsers.map((v, i) => (`<div class="card">
					<div class="card-header">
						<a data-toggle="collapse" href="#cooler-${v.name}-collapsible" 
										 role="button" aria-expanded="false" 
										 aria-controls="cooler-${v.name}-collapsible"
										 data-parent="#browsers">
							<img src="${v.img}" />
						</a>
					</div>
					<div class="collapse" id="cooler-${v.name}-collapsible" 
							data-parent="#browsers">
						<div class="card-body">
							${support[i].textContent}
						</div>
					</div>
				</div>`))}
			</div>
		</div>
    `);
}