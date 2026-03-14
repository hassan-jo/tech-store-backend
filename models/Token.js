const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({

user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
unique: true,
},

refreshToken: String,

blacklistedAccessTokens: {
type: [String],
default: [],
},

});

module.exports = mongoose.model("Token", tokenSchema);