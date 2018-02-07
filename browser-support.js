$(document).ready(function() {
    const rows = $('.MsoNormalTable tr').splice(1);
    const browsers = rows.filter((v, i) => i % 2 === 0)
        .map(v => {
            let picture = Array.from(v.children[0].children[0].children).pop().children[0];
            return {
                "img": picture.src,
                "name": picture.alt
            }
        });
    const support = rows.filter((v, i) => i % 2 === 1);

    $('body').html(`
        <h1>Browser Support for TooCOOL</h1>
        ${browsers.map(v => (
            `<a class="btn btn-primary" data-toggle="collapse" href="#cooler-${v.name}-collapsible" 
                role="button" aria-expanded="false" aria-controls="cooler-${v.name}-collapsible">
                <img src="${v}" />
            </a>`
        ))}
        ${support.map((v, i) => (
            `<div id="cooler-${browsers[i].name}-collapsible" class="card card-body">${v}</div>`    
        ))};
    `);
});