const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequest } = require('../errors');
const Character = require('../models/Character')

const createCharacter = async(req, res) => {
  req.body.createdBy = req.user.userID;
  const character = await Character.create(req.body);

  res.status(StatusCodes.CREATED).json({ character })
}

const getAllCharacters = (req, res) => {
  res.send('getAllCharacters')
}

const getAllVillagers = (req, res) => {
  res.send('getAllVillagers')
}

const updateCharacter = (req, res) => { 
  res.send("updateCharacter")
}

const deleteCharacter = (req, res) => { 
  res.send("deleteCharacter")
}

module.exports = {createCharacter, getAllCharacters, getAllVillagers, updateCharacter, deleteCharacter}