import dotenv from 'dotenv';
import { connection } from 'mongoose';
import { app } from './app';

dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

const server = app.listen(PORT, () => {
  console.log('App running on PORT', PORT);
}); 

process.on('SIGINT', async () => {
  server.close();
  await connection.close();
  console.log('App server and connection to MongoDB closed');
});