import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import indexRouter from './routes/index';
import resumeRouter from './routes/resume';


var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

mongoose.connect(process.env.DBURI,(err) => {
  if(err) throw err;

  console.log('database connected ');
})

app.use('/', indexRouter);
app.use('/', resumeRouter);



const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))