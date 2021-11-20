const express = require('express');
const router = express.Router();
const {
  createCharacter,
  getAllCharacters,
  getAllVillagers,
  updateCharacter,
  deleteCharacter
} = require('../controllers/characters')

// villagers
router.route('/villagers').get(getAllVillagers)

// characters
router.route('/').post(createCharacter).get(getAllCharacters)
router.route('/:id').put(updateCharacter).delete(deleteCharacter)

module.exports = router;