const db = require('./db');



// 1. Listar tudo
exports.findAll = async () => {
    const query = 'SELECT id, title, artist, album, cover_url FROM songs';
    const [rows] = await db.query(query);
    return rows;
};

// 2. Buscar por ID
exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM songs WHERE id = ?', [id]);
    return rows[0];
};

// 3. Criar Música
exports.createSong = async (title, artist, album) => {
    // Inserimos os nomes diretamente como TEXTO
    const query = 'INSERT INTO songs (title, artist, album) VALUES (?, ?, ?)';
    
    // Nota: Se a tua base de dados exigir 'genre_id', pode dar erro aqui. 
    // Mas vamos tentar assim primeiro, que é o padrão.
    const [result] = await db.query(query, [title, artist, album]);
    return result.insertId;
};

// 4. Atualizar
exports.update = async (id, title, artist, album) => {
    const query = 'UPDATE songs SET title = ?, artist = ?, album = ? WHERE id = ?';
    const [result] = await db.query(query, [title, artist, album, id]);
    return result.affectedRows;
};

// 5. Apagar
exports.delete = async (id) => {
    const [result] = await db.query('DELETE FROM songs WHERE id = ?', [id]);
    return result.affectedRows;
};

exports.findArtistByName = async () => null;
exports.createArtist = async () => null;