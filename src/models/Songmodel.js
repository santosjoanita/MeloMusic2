const db = require('./db'); 


// Buscar todas as músicas (com os nomes de Artista e Álbum)
exports.findAll = async () => {
    const query = `
        SELECT 
            songs.id, 
            songs.title, 
            artists.name AS artist,
            albums.title AS album
        FROM songs 
        LEFT JOIN albums ON songs.album_id = albums.id 
        LEFT JOIN artists ON albums.artist_id = artists.id
    `;
    const [rows] = await db.query(query);
    return rows;
};

// Buscar música por ID
exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM songs WHERE id = ?', [id]);
    return rows[0];
};

// Sistema CRUD para artistas e álbuns

exports.findArtistByName = async (name) => {
    const [rows] = await db.query('SELECT id FROM artists WHERE name = ?', [name]);
    return rows[0];
};

exports.createArtist = async (name) => {
    const [result] = await db.query('INSERT INTO artists (name, bio) VALUES (?, ?)', [name, 'Artista criado via API']);
    return result.insertId;
};

exports.findAlbum = async (artistId, title) => {
    const [rows] = await db.query('SELECT id FROM albums WHERE artist_id = ? AND title = ?', [artistId, title]);
    return rows[0];
};

exports.createAlbum = async (artistId, title) => {
    const [result] = await db.query('INSERT INTO albums (artist_id, title, release_year) VALUES (?, ?, ?)', [artistId, title, new Date().getFullYear()]);
    return result.insertId;
};

// sistema CRUD das músicas

exports.createSong = async (title, albumId) => {
    const [result] = await db.query('INSERT INTO songs (title, album_id) VALUES (?, ?)', [title, albumId]);
    return result.insertId;
};

exports.update = async (id, title, albumId) => {
    const [result] = await db.query('UPDATE songs SET title = ?, album_id = ? WHERE id = ?', [title, albumId, id]);
    return result.affectedRows;
};

exports.delete = async (id) => {
    const [result] = await db.query('DELETE FROM songs WHERE id = ?', [id]);
    return result.affectedRows;
};