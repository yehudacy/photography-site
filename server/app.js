const express = require('express');
const cors = require('cors');

const app = express();

//import routes
const {galleryRouter} = require('./routes/galleryRoute');

app.use(express.json());
app.use(cors());

app.use('/gallery', galleryRouter);




app.listen(process.env.PORT);