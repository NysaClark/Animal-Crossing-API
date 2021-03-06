const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");
const Character = require("../models/Character");
const Villager = require("../models/Villager");

const createCharacter = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const character = await Character.create(req.body);

  res.status(StatusCodes.CREATED).json({ character });
};

const getAllCharacters = async (req, res) => {
  const characters = await Character.find({ createdBy: req.user.userID }).sort("createdAt");

  res.status(StatusCodes.OK).json({ characters, length: characters.length });
};

const getAllVillagers = async (req, res) => {
  const { sort } = req.query;

  let results = Villager.find({});

  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("name species -gender");
  }

  const villagers = await results;

  return res.status(StatusCodes.OK).json({
    villagers,
    length: villagers.length,
  });
};

const updateCharacter = async (req, res) => {
  const { name, gender, birthday } = req.body;
  const { userID } = req.user;
  const { id: characterID } = req.params;

  if (!name && !gender && !birthday) {
    throw new BadRequest("Please provide a name, gender, or birthday");
  }

  const character = await Character.findByIdAndUpdate(
    { _id: characterID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );

  if (!character) {
    throw new BadRequest(`No character with id ${characterID}`);
  }

  res.status(StatusCodes.OK).json({ character });
};

const deleteCharacter = async (req, res) => {
  const { id: characterID } = req.params;
  const { userID } = req.user;

  const character = await Character.findOneAndRemove({
    _id: characterID,
    createdBy: userID,
  });

  if (!character) {
    throw new BadRequest(`No job with id ${characterID} found`);
  }

  res.status(StatusCodes.OK).json({ character });
};

module.exports = {
  createCharacter,
  getAllVillagers,
  getAllCharacters,
  updateCharacter,
  deleteCharacter,
};
