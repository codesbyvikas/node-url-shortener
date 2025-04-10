const express = require('express');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require('./connect');
const path = require("path");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth")

const urlRoute = require('./routes/url');
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log(`Database Connected`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);


app.listen(
    PORT,()=>console.log(`Server listening on ${PORT}`))

