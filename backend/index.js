const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routes/products');
const { userRouter } = require('./routes/userRoutes');


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://anshukumari181405:Akash%40123@cluster0.fbsukfp.mongodb.net/fullstackproduct?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:'));
db.once('open',() => {
    console.log('Connected to Mongodb');
});
//Routes
app.use('/users', userRouter);
app.use('/api', productsRouter);

// app.use('/',(req, res) => {
//     res.json(({message:'homepage'}));
// })

const PORT = 8080;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});