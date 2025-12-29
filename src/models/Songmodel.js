const db = require('./db');



// Listar tudo
exports.findAll = async () => {
    const query = 'SELECT id, title, artist, album, cover_url FROM songs';
    const [rows] = await db.query(query);
    return rows;
};

// Buscar por ID
exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM songs WHERE id = ?', [id]);
    return rows[0];
};

// Criar Música
exports.createSong = async (title, artist, album) => {
    // Inserimos os nomes diretamente como TEXTO
    const query = 'INSERT INTO songs (title, artist, album) VALUES (?, ?, ?)';
    

    const [result] = await db.query(query, [title, artist, album]);
    return result.insertId;
};

// Atualizar
exports.update = async (id, title, artist, album) => {
    const query = 'UPDATE songs SET title = ?, artist = ?, album = ? WHERE id = ?';
    const [result] = await db.query(query, [title, artist, album, id]);
    return result.affectedRows;
};

// Apagar
exports.delete = async (id) => {
    const [result] = await db.query('DELETE FROM songs WHERE id = ?', [id]);
    return result.affectedRows;
};

exports.findArtistByName = async () => null;
exports.createArtist = async () => null;