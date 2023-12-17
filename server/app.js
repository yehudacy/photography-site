const express = require('express');
const cors = require('cors');

const app = express();

//import routes
const {galleryRouter} = require('./routes/galleryRoute');
const {contactMeRouter} = require('./routes/contactMeRoute');
const {ordersRouter} = require('./routes/ordersRoute');

app.use(express.json());
app.use(cors());

app.use('/gallery', galleryRouter);
app.use('/contactme', contactMeRouter);
app.use('/order', ordersRouter);




app.listen(process.env.PORT);