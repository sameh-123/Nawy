import mongoose from 'mongoose';

export default async function connectToDatabase() {
  // create connection with database
  const mongoDb = await mongoose.connect(process.env.DATABASE_URL as string);
  const db = mongoDb.connection;

  db.on('error', (err) => {
    console.error(err);
  });

  db.once('open', () => {
    console.log('Database connect successfuly');
  });

  return db;
}
