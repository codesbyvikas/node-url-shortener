const express = require('express');
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url');
const URL = require('./models/url')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log(`Database Connected`));

app.use(express.json());

app.use("/url",urlRoute);


app.listen(
    PORT,()=>console.log(`Server listening on ${PORT}`))

