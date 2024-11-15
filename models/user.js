// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },

//   uname: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//     set(value) {
//       this.setDataValue("email", value.toLowerCase());
//     },
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   isPrime: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//   },
//   total_expense: {
//     type: Sequelize.INTEGER,
//     defaultValue: 0,
//     allowNull: false,
//   },
// });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    set: function (value) {
      return value.toLowerCase();
    },
  },
  password: {
    type: String,
    required: true,
  },
  isPrime: {
    type: Boolean,
    required: true,
  },
  total_expense: {
    type: Number,
    default: 0,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
