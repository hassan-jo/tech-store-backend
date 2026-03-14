const mongoose = require("mongoose");

const imeiServiceSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true
},

category: {
type: mongoose.Schema.Types.ObjectId,
ref: "Category",
required: true
},

orderIndex: {
type: Number,
default: 0
}
},
{ timestamps: true }
);

module.exports = mongoose.model("ImeiService", imeiServiceSchema);