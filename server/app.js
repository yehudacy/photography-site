const express = require('express');
const cors = require('cors');
const { checkDataBaseConnection } = require('../database/dbConnection');


const app = express();

//import routes
const {galleryRouter} = require('./routes/galleryRoute');
const {contactMeRouter} = require('./routes/contactMeRoute');
const {ordersRouter} = require('./routes/ordersRoute');
const {usersRouter} = require('./routes/usersRoute');

app.use(cors());
app.use(express.json());

app.use('/gallery', galleryRouter);
app.use('/contactme', contactMeRouter);
app.use('/order', ordersRouter);
app.use('/users', usersRouter);




const startServer = async () => {
    try{
        const isConnected = await checkDataBaseConnection();
        if(isConnected){
            const port = process.env.PORT || 4000;
            app.listen(port, () => {
                console.log(`app listening on port ${port}`);
            });
        } else {
            throw new Error(`The connection failed`);
        }
    } catch (error) {
        console.log(`cannot connect to data base -> ${error.message}`);
    }
}
startServer();

