const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be provided'],
    },
    personality: {
      type: String,
      enum: {
        values: ['lazy', 'normal', 'peppy', 'jock', 'cranky', 'snooty', 'sisterly', 'smug'],
        message: `{VALUE} is not supported`
      }
    },
    species: {
      type: String,
      required: [true, 'species must be provided'],
      enum: {
        values: ['human', 'alligator', 'anteater', 'bear', 'bird', 'bull', 'cat', 'chicken', 'cow', 'cub', 'deer', 'dog', 'duck', 'eagle', 'elephant', 'frog', 'goat', 'gorilla', 'hamster', 'hippo', 'horse', 'kangaroo', 'koala', 'lion', 'monkey', 'mouse', 'octopus', 'ostrich', 'penguin', 'pig', 'rabbit', 'rhino', 'sheep', 'squirrel', 'tiger', 'wolf'],
        message: '{VALUE} is not supported'
      }
    },
    gender: {
      type: String,
      required: [true, 'gender must be provided'],
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported'
      }
    },
    birthday: {
      type: String,
      required: [true, 'birthday (m/d) must be provided'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
    }
  }
);

module.exports = mongoose.model("Character", characterSchema);