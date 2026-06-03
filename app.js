require("dotenv").config({ path: require('path').resolve(__dirname, '.env') });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default; 
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const localDbUrl = "mongodb://127.0.0.1:27017/wanderlust";
let dbUrl = process.env.ATLASDB_URL || localDbUrl;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


let storeOptions = {
    crypto: {
        secret: process.env.SECRET || "mysupersecretcode"
    },
    touchAfter: 24 * 3600,
};


if (process.env.NODE_ENV !== "production") {
    console.log("Local development detected. Routing Session Store to Local MongoDB.");
    storeOptions.mongoUrl = localDbUrl;
    dbUrl = localDbUrl; 
} else {
    storeOptions.mongoUrl = dbUrl;
}

const store = MongoStore.create(storeOptions);

store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null;
    next();
});


app.get("/", (req, res) => {
    res.redirect("/listings"); 
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


async function main(){
    try {
        await mongoose.connect(dbUrl);
        console.log("connected to DB successfully");
    } catch(err) {
        console.log("Mongoose connection fallback triggered.");
        await mongoose.connect(localDbUrl);
        console.log("connected to Local DB Fallback");
    }
}

main();

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8000, () => {
    console.log("server is listening to port 8000");
});