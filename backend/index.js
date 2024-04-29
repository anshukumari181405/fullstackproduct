const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://anshukumari181405:Akash%40123@cluster0.fbsukfp.mongodb.net/fullstackproduct?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:'));
db.once('open',() => {
    console.log('Connected to Mongodb');
});

//Routes
const productsRouter = require('./routes/products');
app.use('api/products', productsRouter);

const PORT = 8080;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});