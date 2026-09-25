// Variables del DOM
const userContainer = document.getElementById('userContainer');
const searchInput = document.getElementById('searchInput');

let usersData = []; // Array para almacenar los datos originales

// Obtener datos desde una API pública con fetch()
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        usersData = await response.json();
        renderUsers(usersData); // Mostrar datos dinámicamente
    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }
}

// Función para renderizar los usuarios en el DOM
function renderUsers(users) {
    userContainer.innerHTML = ''; // Limpiar contenedor

    users.forEach(user => {
        // Crear elemento de tarjeta
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Ciudad: ${user.address.city}</p>
        `;

        userContainer.appendChild(card);
    });
}

// Interacción básica: Filtro de búsqueda
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Filtrar usuarios por nombre
    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers(filteredUsers);
});

// Inicializar la aplicación
fetchUsers();