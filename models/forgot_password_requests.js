// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
// const { DataTypes } = require("sequelize");

// const Password_Request = sequelize.define("password_request", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   isActive: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//   },
// });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordRequestSchema = new Schema({
  // MongoDB automatically creates _id as UUID, so we don't need to define id

  userId: {
    type: Schema.Types.ObjectId, // Reference to User model
    required: true,
    ref: "User", // This enables population if needed
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("PasswordRequest", passwordRequestSchema);
