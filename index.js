const express = require('express');
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const path = require("path")
const staticRoute = require("./routes/staticRouter")

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log(`Database Connected`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use("/",staticRoute);


app.listen(
    PORT,()=>console.log(`Server listening on ${PORT}`))

