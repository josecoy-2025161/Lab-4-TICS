const usuarioContainer = document.getElementById('usuario-container');
const buscarInput = document.getElementById('buscar-input');
const mensajeContainer = document.getElementById('mensaje-container');

let usuariosData = [];

// Función para obtener las dos primeras letras del nombre para el avatar
function getIniciales(nombre) {
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

// Colores para los avatares
const coloresArray = ['#20c997', '#fcc419', '#ff922b', '#d6336c', '#339af0'];

async function fetchUsuarios() {
    try {
        mensajeContainer.innerHTML = '';
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }
        usuariosData = await response.json();
        renderUsuarios(usuariosData);
    } catch (error) {
        // Mostrar mensaje si no se logran cargar los usuarios
        usuarioContainer.innerHTML = '';
        mensajeContainer.innerHTML = '<div class="error-mensaje">No se pudieron cargar los usuarios. Por favor, verifica tu conexión a internet e inténtalo de nuevo.</div>';
    }
}

function renderUsuarios(usuariosList) {
    usuarioContainer.innerHTML = '';
    mensajeContainer.innerHTML = '';

    // Mostrar si la búsqueda no arroja resultados
    if (usuariosList.length === 0) {
        mensajeContainer.innerHTML = '<div class="vacio-mensaje">No se encontraron usuarios que coincidan con la búsqueda.</div>';
        return;
    }

    usuariosList.forEach((usuario, index) => {
        const userCard = document.createElement('div');
        userCard.className = 'usuario-card';

        const iniciales = getIniciales(usuario.name);
        const bgColor = coloresArray[index % coloresArray.length];

        // Se usan backticks (template literals) para inyectar HTML
        userCard.innerHTML = `
            <div class="avatar-circulo" style="background-color: ${bgColor}">${iniciales}</div>
            <h3>${usuario.name}</h3>
            <div class="username-texto">@${usuario.username.toLowerCase()}</div>
            <div class="info-fila">✉️ ${usuario.email.toLowerCase()}</div>
            <div class="info-fila">📞 ${usuario.phone.split(' ')[0]}</div>
            <div class="info-fila">📍 ${usuario.address.city}</div>
            <div class="info-fila">🏢 ${usuario.company.name}</div>
        `;

        usuarioContainer.appendChild(userCard);
    });
}

// Filtro en tiempo real por nombre, usuario o correo electrónico
buscarInput.addEventListener('input', (e) => {
    const searchTermino = e.target.value.toLowerCase();

    const filteredUsuarios = usuariosData.filter(usuario =>
        usuario.name.toLowerCase().includes(searchTermino) ||
        usuario.username.toLowerCase().includes(searchTermino) ||
        usuario.email.toLowerCase().includes(searchTermino)
    );

    renderUsuarios(filteredUsuarios);
});

// Inicializar
fetchUsuarios();