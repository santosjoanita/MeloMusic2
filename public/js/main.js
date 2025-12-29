const API_URL = 'http://localhost:3001/api/songs';
let editMode = false; 
let currentId = null; 


document.addEventListener('DOMContentLoaded', fetchSongs);

// Lista as músicas
async function fetchSongs() {
    try {
        const response = await fetch(API_URL);
        const songs = await response.json();
        const list = document.getElementById('music-list');
        list.innerHTML = '';

        songs.forEach(song => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${song.title}</strong> - ${song.artist} <small>(${song.album || 'Single'})</small></span>
                <div>
                    <button onclick="prepararEdicao(${song.id}, '${song.title}', '${song.artist}', '${song.album}')" style="background-color: orange;">Editar</button>
                    <button onclick="deleteSong(${song.id})" style="background-color: red;">X</button>
                </div>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}
// --- FUNCIONALIDADE EXTRA: PESQUISA ---
document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const songs = document.querySelectorAll('#music-list li'); 

    songs.forEach(song => {
        const text = song.innerText.toLowerCase();
        if (text.includes(searchString)) {
            song.style.display = 'flex';
        } else {
            song.style.display = 'none';
        }
    });
});
// Cria ou atualiza as músicas
document.getElementById('music-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const album = document.getElementById('album').value;

    const data = { title, artist, album };

    if (editMode) {
        // --- MODO EDIÇÃO (PUT) ---
        await fetch(`${API_URL}/${currentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        editMode = false;
        currentId = null;
        document.querySelector('button[type="submit"]').innerText = 'Adicionar Música';
        document.querySelector('button[type="submit"]').style.backgroundColor = ''; // Volta à cor original
    } else {
        // --- MODO CRIAÇÃO (POST) ---
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    // Limpar formulário e recarregar lista
    document.getElementById('music-form').reset();
    fetchSongs();
});

window.prepararEdicao = (id, title, artist, album) => {
    document.getElementById('title').value = title;
    document.getElementById('artist').value = artist;
    document.getElementById('album').value = (album === 'null' || album === 'undefined') ? '' : album;

    // Muda o estado para "Modo Edição"
    editMode = true;
    currentId = id;

    // Muda o botão para o utilizador perceber
    const btn = document.querySelector('button[type="submit"]');
    btn.innerText = 'Guardar Alterações';
    btn.style.backgroundColor = 'orange';
};

//  Apagar
window.deleteSong = async (id) => {
    if (confirm('Tens a certeza?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchSongs();
    }
};