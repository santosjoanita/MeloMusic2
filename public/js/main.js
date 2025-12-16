const API_URL = 'http://localhost:3000/api/songs';


 // FUNÇÃO: Carregar e Mostrar Músicas (GET)

async function fetchSongs() {
    const listElement = document.getElementById('songList');
    
    try {
        const response = await fetch(API_URL);
        const songs = await response.json();

        listElement.innerHTML = ''; // Limpar a lista atual

        if (songs.length === 0) {
            listElement.innerHTML = '<li style="text-align:center; color:#777;">Nenhuma música encontrada na base de dados.</li>';
            return;
        }

        songs.forEach(song => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="song-info">
                    <strong>${song.title}</strong>
                    <small>${song.artist}</small>
                </div>
                <button class="btn-delete" onclick="deleteSong(${song.id})">Apagar</button>
            `;
            listElement.appendChild(li);
        });

    } catch (error) {
        console.error('Erro ao buscar músicas:', error);
        listElement.innerHTML = '<li style="color:red; text-align:center;">Erro ao carregar dados da API.</li>';
    }
}


 //FUNÇÃO: Criar Nova Música (POST)
 
async function createSong(event) {
    event.preventDefault(); // Impede a página de recarregar

    const titleInput = document.getElementById('title');
    const artistInput = document.getElementById('artist');

    const newSong = {
        title: titleInput.value,
        artist: artistInput.value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        });

        if (response.ok) {
            // Limpar campos
            titleInput.value = '';
            artistInput.value = '';
            // Atualizar a lista
            fetchSongs();
        } else {
            alert('Erro ao criar música. Verifica se os campos estão preenchidos.');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão com a API.');
    }
}


//  FUNÇÃO: Apagar Música (DELETE)
 
async function deleteSong(id) {
    if (!confirm('Tens a certeza que queres apagar esta música?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchSongs(); // Recarregar a lista
        } else {
            alert('Erro ao apagar música.');
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}



// 1. Carregar lista ao abrir a página
document.addEventListener('DOMContentLoaded', fetchSongs);

// 2. Adicionar evento ao formulário
const form = document.getElementById('addSongForm');
if (form) {
    form.addEventListener('submit', createSong);
}