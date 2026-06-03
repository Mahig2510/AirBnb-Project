const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FIX: Add .default at the end of the require statement to extract the inner function
const passportLocalMongoose = require("passport-local-mongoose").default || require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// Now this will receive a function instead of an object!
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
