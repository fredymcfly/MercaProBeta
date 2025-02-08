async function ObtenerApi(url, headers = {}) {
    try {
        const respuesta = await fetch(url, { method: "GET", headers });

        if (!respuesta.ok)
        {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }

        return await respuesta.json();
    } catch (error) {
        console.error("Error en ObtenerApi:", error);
        return null;
    }
}


async function EnviarApi(url, datos, headers = {}) {
    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", headers },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok)
        {
            //throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            console.log(respuesta);
        }

        return await respuesta;//.json();
    } catch (error) {
        console.error("Error en EnviarApi:", error);
        return null;
    }
}

// Ejemplo de uso
(async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";

    // Llamada GET
    const datosGet = await ObtenerApi(url + "/1");
    console.log("GET:", datosGet);

    // Llamada POST
    const datosPost = await EnviarApi(url, { title: "Nuevo post", body: "Contenido", userId: 1 });
    console.log("POST:", datosPost);
})();