const passportLocalMongoose    = require("passport-local-mongoose"),
    passport 				= require('passport'),
    mongoose 				= require("mongoose"),
    LocalStrategy = require('passport-local');


const User = mongoose.model("Punchuser");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
