const express = require('express');
const router = express.Router();

const songController = require('../controllers/Songcontroller');

//  (Endpoints)
router.get('/', songController.getAllSongs);      
router.post('/', songController.createSong);     
router.put('/:id', songController.updateSong);    
router.delete('/:id', songController.deleteSong); 

module.exports = router;