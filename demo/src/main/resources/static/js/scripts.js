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

     contenedor.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target && event.target.matches('#nuevaLista')) {
                (async () => {
                    const url = "/api/lists/nuevaLista";
                    cargarVistaAContenido(url);
                })();
            }
            else if(event.target && event.target.matches('#guardarLista'))
            {
                onSaveLista();
            }
            else if(event.target && event.target.matches(".verLista"))
            {
                console.log(event.target);
                onVerLista(event.target);
            }
        });

     const home = document.body.querySelector('#home');
        home.addEventListener('click', event => {
            event.preventDefault();
            const url = "/home";
            cargarVistaAContenido(url);
        });

    const menuListas = document.body.querySelector('#mislistsas');
    menuListas.addEventListener('click', event => {
        event.preventDefault();
        abrirListas();
    });


    async function onVerLista(e)
    {
        cargarVistaAContenido(e);
    }
    async function abrirListas()
    {
        const url = "/api/lists";
        cargarVistaAContenido(url);
    }

    async function onSaveLista(){
            const listName = document.getElementById('listName').value;
            const listDate = document.getElementById('listDate').value;

            if (listName.trim() && listDate.trim()) {
                const data = {
                    nombre: listName,
                    date: listDate
                };

                const url = "/api/lists/save";
                const response = await EnviarApi(url, data);
                if (response.ok)
                {
                    alert('Lista guardada correctamente');
                    document.getElementById('newListForm').reset();
                    //window.location.href = "http://localhost:8000/api/lists";
                } else {
                    alert('Error al guardar la lista');
                }
               /*try {
                    const response = fetch('/api/lists/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        alert('Lista guardada correctamente');
                        document.getElementById('newListForm').reset();
                        //window.location.href = "http://localhost:8000/api/lists";
                    } else {
                        alert('Error al guardar la lista');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al comunicarse con el servidor');
                }*/
            } else {
                alert('Por favor, completa todos los campos.');
            }
        }

    function cargarVistaAContenido(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById("contenido").innerHTML = html;
            })
            .catch(error => console.error("Error cargando la vista:", error));
    }

    const url = "/home";
    cargarVistaAContenido(url);

});


