const createCharacter = (req, res) => {
  res.send('createCharacter')
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