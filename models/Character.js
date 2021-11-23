const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be provided'],
    },
    species: {
      type: String,
      default: "human",
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
      type: Date,
      required: [true, 'birthday (m/d) must be provided'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", characterSchema);