/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    /*const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }*/
    const contenedor = document.getElementById('contenido');

    const menuListas = document.body.querySelector('#mislistsas');
    menuListas.addEventListener('click', event => {
        event.preventDefault();
        (async () => {
            const url = "/api/lists";
            cargarVistaAContenido(url);
            // Llamada POST
            //const datosPost = await EnviarApi(url, { title: "Nuevo post", body: "Contenido", userId: 1 });
            //console.log("POST:", datosPost);
        })();
    });

    //const menuNuevaLista = document.body.querySelector('#btnNuevaLista');
    contenedor.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.nuevaLista')) {
            event.preventDefault();
            (async () => {
                const url = "/api/lists/nuevaLista";
                cargarVistaAContenido(url);
            })();
        }
    });

    function cargarVistaAContenido(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById("contenido").innerHTML = html;
            })
            .catch(error => console.error("Error cargando la vista:", error));
    }

});