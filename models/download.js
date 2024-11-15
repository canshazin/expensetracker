const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const downloadSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, // Reference to User model
    required: true,
    ref: "User", // This enables population if needed
  },
});
module.exports = mongoose.model("Download", downloadSchema);
