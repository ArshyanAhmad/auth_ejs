import express from "express";
import mongoose from "mongoose";
import path from "path";
import 'dotenv/config';

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database is connected");
    })
    .catch((error) => {
        console.log(`Error occured while connecting database ${error}`);
    })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema);

const app = express();
const currPath = path.resolve();
const PORT = process.env.PORT || 6000;

app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render('login.ejs');
});

app.listen(PORT, () => {
    console.log(`App is listening on port at ${PORT}`);
});