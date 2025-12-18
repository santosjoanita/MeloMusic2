const SongModel = require('../models/Songmodel');


async function getOrCreateAlbumId(artistName) {
    // Tratar Artista
    let artist = await SongModel.findArtistByName(artistName);
    let artistId;
    
    if (artist) {
        artistId = artist.id;
    } else {
        artistId = await SongModel.createArtist(artistName);
    }

    // 2. Tratar Álbum (Usa "Singles" por defeito)
    let album = await SongModel.findAlbum(artistId, 'Singles');
    let albumId;

    if (album) {
        albumId = album.id;
    } else {
        albumId = await SongModel.createAlbum(artistId, 'Singles');
    }

    return albumId;
}

// Controladores

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await SongModel.findAll();
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar músicas.' });
    }
};

exports.createSong = async (req, res) => {
    const { title, artist } = req.body;

    if (!title || !artist) {
        return res.status(400).json({ error: 'Título e Artista são obrigatórios.' });
    }

    try {
        const albumId = await getOrCreateAlbumId(artist);
        const newId = await SongModel.createSong(title, albumId);

        res.status(201).json({ 
            id: newId, 
            title, 
            artist, 
            message: 'Música criada com sucesso.' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar música.' });
    }
};

exports.updateSong = async (req, res) => {
    const { id } = req.params;
    const { title, artist } = req.body;

    if (!title || !artist) {
        return res.status(400).json({ error: 'Título e Artista são obrigatórios.' });
    }

    try {
        const albumId = await getOrCreateAlbumId(artist);
        const result = await SongModel.update(id, title, albumId);

        if (result === 0) {
            return res.status(404).json({ error: 'Música não encontrada.' });
        }
        
        res.json({ message: 'Música atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar música.' });
    }
};

exports.deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await SongModel.delete(id);
        
        if (result === 0) {
            return res.status(404).json({ error: 'Música não encontrada.' });
        }
        res.json({ message: 'Música apagada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao apagar música.' });
    }
};