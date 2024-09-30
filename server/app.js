const express = require('express');
const cors = require('cors');
const { checkDataBaseConnection } = require('../database/dbConnection');


const app = express();

//import routes
const {galleryRouter} = require('./routes/galleryRoute');
const {contactMeRouter} = require('./routes/contactMeRoute');
const {ordersRouter} = require('./routes/ordersRoute');
const {usersRouter} = require('./routes/usersRoute');
const {categoryRouter} = require('./routes/categoryRoute');
const {imagesRouter} = require('./routes/imagesRoute');
const {paypalRouter} = require('./routes/paypalRouter');
const { nonPaidOrdersRouter } = require('./routes/nonPaidOrdersRoute');
const { packagePriceRouter } = require('./routes/packagePricesRoute');

app.use(cors());
app.use(express.json());

app.use('/gallery', galleryRouter);
app.use('/contactme', contactMeRouter);
app.use('/order', ordersRouter);
app.use('/nonpaidorders', nonPaidOrdersRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/images', imagesRouter);
app.use('/pay', paypalRouter);
app.use('/pricing', packagePriceRouter);




const startServer = async () => {
    try{
        const isConnected = await checkDataBaseConnection();
        if(isConnected){
            const port = process.env.PORT || 5000;
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

