import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
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

app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render('login.ejs');
});

app.get("/register", (req, res) => {
    res.render("register");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const userExit = await User.findOne({ email });

    if (userExit) {
        return res.redirect('/login');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = jwt.sign({ _id: user._id }, "secret")

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    })

    res.redirect("/login");
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    

})

app.listen(PORT, () => {
    console.log(`App is listening on port at ${PORT}`);
});