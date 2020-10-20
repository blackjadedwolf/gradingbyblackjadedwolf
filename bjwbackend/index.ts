import express from "express";
import mongoose from 'mongoose'

import {json} from 'body-parser'

import {OrderRouter} from './routes/order'

const app = express();
app.use(json());
app.use(OrderRouter)
const PORT = 8000;

const DB_URI = process.env.DATABASE_URI;

if(!DB_URI) {
  throw new Error("No DB URI found in environment variables")
}

mongoose.connect(DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("connected to database")
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
