$(document).ready(function () {
	const rows = $('.MsoNormalTable tr');
	const browsers = [rows[1], rows[4], rows[6], rows[9]].map(v => {
			let picture = Array.from($('img', v)).pop();
			return {
				"img": picture.src,
				"name": picture.alt.replace(/ /g, "")
			}
		});
	const support = [rows[2], rows[5], rows[7], rows[10]];

	$('.WordSection1').remove();
	$('.navbar-nav')[0].children[1].className += " active";
	$('body').append(`	
		<div class="container">
			<div class="jumbotron">
				<h1 class="display-4">TooCOOL Browser Support</h1>
				<p class="lead">Having troubles viewing your online store? It may be because TooCOOL doesn't 
				support your browser.</p>
			</div>
	        
	        <div id="browsers">
				${browsers.map((v, i) => (`<div class="card">
					<div class="card-header text-center">
						<a data-toggle="collapse" href="#cooler-${v.name}-collapsible" 
										 role="button" aria-expanded="false" 
										 aria-controls="cooler-${v.name}-collapsible"
										 data-parent="#browsers">
							<img src="${v.img}" class="img-fluid" />
						</a>
					</div>
					<div class="collapse" id="cooler-${v.name}-collapsible" 
							data-parent="#browsers">
						<div class="card-body">${support[i].innerHTML}</div>
					</div>
				</div>`)).join('')}
			</div>
		</div>
    `);
});