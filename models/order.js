// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Order = sequelize.define("order", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },

//   order_id: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   payment_id: {
//     type: Sequelize.STRING,

//     allowNull: true,
//   },
//   status: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const orderSchema = new Schema({
  // MongoDB automatically handles _id, so we don't need the id field

  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: false, // equivalent to allowNull: true
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, // Reference to User model
    required: true,
    ref: "User", // This enables population if needed
  },
});
module.exports = mongoose.model("Order", orderSchema);
