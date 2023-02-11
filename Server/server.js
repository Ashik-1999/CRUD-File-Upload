const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoute = require('./Routes/post');
const cors = require('cors');



dotenv.config();

mongoose.connect(process.env.MONGO_URL , ()=>{
    console.log('connected to database');
});

app.use(express.json());
app.use(cors());

app.use('/document', express.static('document'))

app.use('/api/post', postRoute);

app.listen(4000, () => console.log('server connected!'));