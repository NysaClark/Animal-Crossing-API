// environment set-up
require('dotenv').config();
require('express-async-errors');

// app core
const express = require('express');
const app = express();
const connectDB = require('./db/connect')

// middleware
const authenticateUser = require();
const errorHandler = require();
const notFound = require();

// routes
const villagersRouter = require()
const authRouter = require('')

// SwaggerUI
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = YAML.load('./swagger.yaml')

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
  //   res.send(`<h1>Animal Crossing API><a href="/api-docs">Documentation</a>`)
  // })
  // .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

  .use('/api/v1/auth', authRouter)
  .use('/api/v1/villagers', /* authenticateUser, */ villagersRouter)

  // .use(notFound)
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