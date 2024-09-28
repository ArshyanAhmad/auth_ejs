import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import jwt, { decode } from "jsonwebtoken"
import 'dotenv/config';

mongoose.connect(process.env.DATABSE_URL)
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
const PORT = process.env.PORT || 6000;

app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const isAuthenticate = async (req, res, next) => {
    let { token } = req.cookies;

    if (token) {
        const decoded = jwt.verify(token, "loginSecret");
        req.user = await User.findById(decoded._id);

        next();
    }
    else {
        res.redirect("/login");
    }

}

app.get("/", isAuthenticate, (req, res) => {
    const { name } = req.user;
    res.render('logout', { name });
});

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.redirect('/login');
})

app.get("/register", (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.render("register");
    }
    else {
        res.redirect('/');
    }
})

app.get('/login', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.render("login");
    }
    else {
        res.redirect('/');
    }

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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_1)

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    })

    res.redirect("/login");
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userExit = await User.findOne({ email });

    if (!userExit) {
        return res.redirect('/register');
    }

    const token = jwt.sign({ _id: userExit._id }, process.env.JWT_SECRET_2)

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    })

    if (email == userExit.email && password == userExit.password) {
        res.redirect("/");
    }
    else {
        res.redirect("/login");
    }

})

app.listen(PORT, () => {
    console.log(`App is listening on port at ${PORT}`);
});