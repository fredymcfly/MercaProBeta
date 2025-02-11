/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/

// Espera a que todo el contenido de la página se haya cargado completamente
window.addEventListener('DOMContentLoaded', event => {

    // 1. Obtiene la referencia al contenedor principal de la página
    const contenedor = document.getElementById('contenido');

    // 2. Agrega un evento de clic en el contenedor para manejar las interacciones dinámicas
    contenedor.addEventListener('click', function(event) {
        event.preventDefault(); // 3. Evita la recarga de la página cuando se hace clic

        if (event.target && event.target.matches('#nuevaLista')) {
            // 4. Si el usuario hace clic en "nuevaLista", se carga la vista correspondiente de forma asíncrona
            (async () => {
                const url = "/api/lists/nuevaLista"; // 5. Define la URL de la API que carga una nueva lista
                cargarVistaAContenido(url); // 6. Llama a la función que carga la vista en el contenedor
            })();
        }
        else if (event.target && event.target.matches('#guardarLista')) {
            // 7. Si se hace clic en "guardarLista", se ejecuta la función para guardar la lista
            onSaveLista();
        }
        else if (event.target && event.target.matches(".verLista")) {
            // 8. Si se hace clic en un elemento con clase "verLista", se muestra la lista específica
            console.log(event.target); // 9. Muestra el elemento en la consola para depuración
            onVerLista(event.target); // 10. Llama a la función que maneja la visualización de la lista
        }
        else if (event.target && event.target.matches('#btnGuardar')) {
            //onEntrar();
        }
    });

    const login = document.body.querySelector('#login');
    login.addEventListener('click', event => {
        event.preventDefault(); // 12. Evita la recarga de la página
        const url = "/login"; // 13. Define la URL de la vista principal
        cargarVistaAContenido(url); // 14. Llama a la función para cargar la vista en el contenedor
    });

    // 11. Evento para el botón "Home", que carga la vista principal
    //la almohadilla es para localizar elementos por id
    //si se usa .home estamos localizando elementos por clase
    const home = document.body.querySelector('#home');
    home.addEventListener('click', event => {
        event.preventDefault(); // 12. Evita la recarga de la página
        const url = "/home"; // 13. Define la URL de la vista principal
        cargarVistaAContenido(url); // 14. Llama a la función para cargar la vista en el contenedor
    });

    // 15. Evento para el botón "Listas de Compra", que carga la vista de listas
    const menuListas = document.body.querySelector('#mislistsas');
    menuListas.addEventListener('click', event => {
        event.preventDefault(); // 16. Evita la recarga de la página
        abrirListas(); // 17. Llama a la función que carga la vista de listas
    });

    // 18. Función que muestra el contenido de una lista específica
    async function onVerLista(e) {
        cargarVistaAContenido(e); // 19. Llama a la función para cargar la vista en el contenedor
    }

    // 20. Función que carga la vista de todas las listas desde la API
    async function abrirListas() {
        const url = "/api/lists"; // 21. Define la URL de la API que devuelve las listas
        cargarVistaAContenido(url); // 22. Llama a la función para cargar la vista en el contenedor
    }

    // 23. Función para guardar una nueva lista en la base de datos
    async function onSaveLista() {
        const listName = document.getElementById('listName').value; // 24. Obtiene el nombre de la lista desde el input
        const listDate = document.getElementById('listDate').value; // 25. Obtiene la fecha de la lista desde el input

        if (listName.trim() && listDate.trim()) { // 26. Verifica que los campos no estén vacíos
            const data = {
                nombre: listName, // 27. Asigna el nombre de la lista al objeto de datos
                date: listDate // 28. Asigna la fecha de la lista al objeto de datos
            };

            const url = "/api/lists/save"; // 29. Define la URL de la API para guardar la lista
            const response = await EnviarApi(url, data); // 30. Llama a la función para enviar los datos al servidor

            if (response.ok) { // 31. Si la respuesta es exitosa
                alert('Lista guardada correctamente'); // 32. Muestra un mensaje de éxito
                document.getElementById('newListForm').reset(); // 33. Resetea el formulario de nueva lista
            } else {
                alert('Error al guardar la lista'); // 34. Muestra un mensaje de error si no se guardó correctamente
            }
        } else {
            alert('Por favor, completa todos los campos.'); // 35. Muestra un mensaje si los campos están vacíos
        }
    }

    // 36. Función que carga una vista en el contenedor principal
    function cargarVistaAContenido(url) {
        fetch(url) // 37. Hace una petición GET a la URL proporcionada
            .then(response => response.text()) // 38. Convierte la respuesta en texto (HTML)
            .then(html => {
                //se recibe contenido html proporcionado por themalyfe
                document.getElementById("contenido").innerHTML = html; // 39. Inserta el HTML en el contenedor
            })
            .catch(error =>
            {
                alert(error);
                console.error("Error cargando la vista:", error);
            });// 40. Captura y muestra errores en la consola
    }

    // 41. Carga la vista inicial de la página
    const url = "/home"; // 42. Define la URL inicial
    cargarVistaAContenido(url); // 43. Llama a la función para cargar la vista en el contenedor
});
