import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { connectToMongoDB } from './config/db';

const run = async () => {
  await connectToMongoDB();
}

run();

export const app = express();

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('<h1>Contact Book API</h1>'));