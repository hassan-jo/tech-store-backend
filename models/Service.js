const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
},

description: {
type: String,
},

price: {
type: Number,
min: 0,
},

category: {
type: mongoose.Schema.Types.ObjectId,
ref: "Category",
required: true,
},

stock: {
type: Number,
default: 0,
min: 0,
},

filterid: {
type: Number
},

images: [
{
type: String,
},
],

},
{
timestamps: true,
}
);

/* تحسين الأداء */
serviceSchema.index({ category: 1 });
serviceSchema.index({ createdAt: -1 });
serviceSchema.index({ name: "text" });

module.exports = mongoose.model("Service", serviceSchema);