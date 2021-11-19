require('dotenv').config();

const connectDB = require('./db/connect');
const Character = require('./models/Character');

const jsonVillagers = require('./villagers.json')

const run = async () => {
  try{
    await connectDB(process.env.MONGO_URL)
    await Character.deleteMany({})
    await Character.create(jsonVillagers)
    console.log('finished populating');
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

run();