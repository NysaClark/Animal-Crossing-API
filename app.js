// environment set-up
require('dotenv').config();
require('express-async-errors');

// app core
const express = require('express');
const app = express();
const connectDB = require('./db/connect')

// middleware
const authenticateUser = require('./middleware/auth');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// routes
const charactersRouter = require('./routes/characters')
const authRouter = require('./routes/auth')

// SwaggerUI
// const YAML = require('yamljs');
// const swaggerUI = require('swagger-ui-express')
// const swaggerDoc = YAML.load('./swagger.yaml')

// security libraries
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const cors = require('cors')

// variables
const port = process.env.PORT || 3000
const minutes = 1000 * 60
const limit = 15 * minutes

app
  .set('trust proxy', 1)
  .use(rateLimiter({
    windowMs: limit,
    max: 100,
  }))

  .use([express.urlencoded({extended: false}), express.json()])

  .use(helmet())
  .use(cors())
  .use(xss())

  // .get('/', (req, res) => {
  //   res.send(`<h1>Animal Crossing API</a>`)
  // })
  // .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

  .use('/api/v1/characters', authenticateUser, charactersRouter)
  .use('/api/v1/auth', authRouter)

  .use(notFound)
  // .use(errorHandler)

const startServer = async() => {
  try{
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`listening @ ${port}`);
    })
  } catch(err) {
    console.log(err);
  }
}

startServer();
