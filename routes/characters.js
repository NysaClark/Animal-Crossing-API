const express = require('express');
const router = express.Router();
const {
  createCharacter,
  getAllCharacters,
  getAllVillagers,
  updateCharacter,
  deleteCharacter
} = require('../controllers/characters')

router.route('/').post(createCharacter).get(getAllCharacters).get(getAllVillagers)
router.route('/:id').put(updateCharacter).delete(deleteCharacter)

module.exports = router;