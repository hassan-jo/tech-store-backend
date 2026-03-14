const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
username: {
type: String,
required: true,
trim: true,
minlength: 3,
maxlength: 30,
},

email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
index: true,
},

password: {
type: String,
required: true,
minlength: 6,
select: false,
},

role: {
type: String,
enum: ["user", "admin"],
default: "user",
},

isVerified: {
type: Boolean,
default: false,
},

emailVerificationToken: {
type: String,
select: false,
},

emailVerificationExpires: {
type: Date,
select: false,
},

tokenVersion: {
type: Number,
default: 0,
},

},
{
timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);