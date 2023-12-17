const express = require('express');
const cors = require('cors');

const app = express();

//import routes
const {galleryRouter} = require('./routes/galleryRoute');
const {contactMeRouter} = require('./routes/contactMeRoute');

app.use(express.json());
app.use(cors());

app.use('/gallery', galleryRouter);
app.use('/contactme', contactMeRouter);




app.listen(process.env.PORT);