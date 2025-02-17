// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  description: {
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
module.exports = mongoose.model("Expense", expenseSchema);

// const Expense = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },

//   amount: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },

//   category: {
//     type: Sequelize.STRING,

//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   date: {
//     type: Sequelize.DATE,
//     allowNull: false,
//   },
// });
// class Expense {
//   constructor(amount, category, description, date) {
//     this.amount = amount;
//     this.category = category;
//     this.description = description;
//     this.date = date;
//   }
//   save() {}
// }
