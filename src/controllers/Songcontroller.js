const SongModel = require('../models/Songmodel');

// --- CONTROLLERS ---

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await SongModel.findAll();
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.createSong = async (req, res) => {
    const { title, artist } = req.body;
    // Se o frontend não enviar álbum, usamos "Single"
    const album = req.body.album || 'Single'; 

    if (!title || !artist) {
        return res.status(400).json({ error: 'Título e Artista são obrigatórios.' });
    }

    try {
        const newId = await SongModel.createSong(title, artist, album);

        res.status(201).json({ 
            id: newId, 
            title, 
            artist,
            album,
            message: 'Música adicionada com sucesso.' 
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateSong = async (req, res) => {
    const { id } = req.params;
    const { title, artist } = req.body;
    const album = req.body.album || 'Single';

    if (!title || !artist) {
        return res.status(400).json({ error: 'Título e Artista são obrigatórios.' });
    }

    try {
        const result = await SongModel.update(id, title, artist, album);

        if (result === 0) {
            return res.status(404).json({ error: 'Música não encontrada.' });
        }
        
        res.json({ message: 'Música atualizada com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: error.message });
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
        console.error('Erro ao apagar:', error);
        res.status(500).json({ error: error.message });
    }
};