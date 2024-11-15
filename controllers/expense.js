const User = require("../models/user.js");
const Expense = require("../models/expense.js");
const sequelize = require("../util/database.js");
const mongoose = require("mongoose");

exports.add_expense = async (req, res, next) => {
  // const t = await sequelize.transaction();
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    let msg = "";
    const expense = req.body;

    const expense_added = new Expense(
      {
        date: expense.date,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        userId: req.user._id,
      }
      // { transaction: t }
    );
    await expense_added.save();

    const new_total_expense =
      Number(expense.amount) + Number(req.user.total_expense);
    // await User.update(
    //   { total_expense: new_total_expense },
    //   {
    //     where: { id: req.user.id },
    //     transaction: t,
    //   }
    // );
    const expensAmt = await User.findById(req.user._id);
    expensAmt.total_expense = new_total_expense;
    await expensAmt.save();

    // await t.commit();
    msg = "expense added succefully";
    const id = expense_added._id;

    const response = { msg, id };
    res.json(response);
  } catch (err) {
    // await t.rollback();

    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the expense" });
  }
};

// exports.get_expenses = async (req, res) => {
//   try {
//     const items_per_page = parseInt(req.query.items_per_page, 10) || 5;
//     const page = parseInt(req.query.page, 10) || 1;
//     let prime = req.user.isPrime || false;
//     const { count, rows: expenses } = await Expense.findAndCountAll({
//       where: { userId: req.user.id },
//       offset: (page - 1) * items_per_page,
//       limit: items_per_page,
//     });
//     res.json({
//       expenses,
//       prime,
//       current_page: page,
//       has_next_page: items_per_page * page < count,
//       next_page: items_per_page * page < count ? page + 1 : null,
//       has_previous_page: page > 1,
//       previous_page: page > 1 ? page - 1 : null,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// };
exports.get_expenses = async (req, res) => {
  try {
    const items_per_page = parseInt(req.query.items_per_page, 10) || 5;
    const page = parseInt(req.query.page, 10) || 1;
    let prime = req.user.isPrime || false;

    // Get total count of documents
    const count = await Expense.countDocuments({ userId: req.user._id });

    // Get paginated expenses
    const expenses = await Expense.find({ userId: req.user._id })
      .skip((page - 1) * items_per_page) // offset
      .limit(items_per_page) // limit
      .lean(); // for better performance

    res.json({
      expenses,
      prime,
      current_page: page,
      has_next_page: items_per_page * page < count,
      next_page: items_per_page * page < count ? page + 1 : null,
      has_previous_page: page > 1,
      previous_page: page > 1 ? page - 1 : null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.delete_expense = async (req, res) => {
  // const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    console.log(id, "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    const expense_to_delete = await Expense.findOne({
      _id: id,
      userId: req.user._id,
    });

    const expense = await Expense.deleteOne({
      _id: id,
      userId: req.user._id,
    });

    const new_total_expense =
      Number(req.user.total_expense) - Number(expense_to_delete.amount);
    // await User.update(
    //   { total_expense: new_total_expense },
    //   {
    //     where: { id: req.user.id },
    //   },
    //   { transaction: t }
    // );
    await User.findByIdAndUpdate(req.user._id, {
      $set: { total_expense: new_total_expense },
    });
    // await t.commit();
    res.json({ success: true });
  } catch (err) {
    // await t.rollback();
    console.log(err);
  }
};
