document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts(); // Se agrega al botón con id "fetch-posts" una función que ejecuta la función que contiene la promesa para hacer la petición y procesar la información
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Se utiliza la API fetch para hacer una consulta tipo "GET" a la url y obtener todos los posts
        .then(response => { // Se toma la respuesta de la petición
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText); //Si la respuesta no fue un exitosa (200), se crea una nueva instancia de error, lo que hace que la promesa sea rechaza y se lleve al "catch" de la promesa
            }
            return response.json(); // Si la respuesta es exitosa, se da por solucionada esta promesa y se pasa a la siguiente etapa en formato json
        })
        .then(posts => {
            displayPosts(posts); //este json que ahora es un array de objetos se pasa a la función "displayPosts" que se encarga de pintar los resultados en el DOM
        })
        .catch(error => {
            displayError(error); // Si la promesa falla, se pasa el error a una función que pinta el mensaje en el DOM
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list'); // Se toma el elemento del DOM con id 'post-list' el cual es un elemento tipo "ul"
    postList.innerHTML = ''; // Se limpia el contenido del elemento "ul"
    posts.forEach(post => { // Se itera por el array de objetos devuelto por el ".then" anterior
        const listItem = document.createElement('li'); // Se crea un elemento tipo "li"
        listItem.textContent = `Title: ${post.title}`; // Se le asigna el título del post al elemento "li" creado en el paso anterior
        postList.appendChild(listItem); // Se le aggrega el elemento "ul" padre que ya fue seleccionado, lo que hace que se renderice este elemento en el DOM
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message'); // Se elige el elemento tipo div del DOM con id "error-message"
    errorMessage.textContent = `Error: ${error.message}`; // Al elemento seleccionado anteriormente se le inserta el mensaje de error como contenido de texto
};