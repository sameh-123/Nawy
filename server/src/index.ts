import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './lib/connectToDatabase.ts';
import bodyParser from 'body-parser';

const apartmentRouter = await import('./routes/apartment.ts');

async function start() {
  // dotenv configuration
  dotenv.config({
    path: './.env',
  });

  // connection to database
  const db = await connectToDatabase();

  // creating the application
  const app = express();

  // parsing the json and form data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.get('/', (req, res) => {
    res.send('hello world');
  });

  // middleware of apartmet router
  app.use('/apartment', apartmentRouter.default);

  // starting the application of the PORT from env
  app.listen(process.env.HTTP_PORT, (err) => {
    if (err) console.error(err);
    else console.log(`serevr running on port ${process.env.HTTP_PORT}`);
  });
}

start();
