const Transaction = require("../../models/transaction");
const { datetoString } = require("../../helper/date");

module.exports = {
  transactions: async (args, req) => {
    try {
      const transactions = await Transaction.find({
        user: args.userId,
      })
        .populate("user")
        .populate("category")
        .sort("-date");
      return transactions.map((transaction) => {
        return {
          ...transaction._doc,
          _id: transaction.id,
          amount: transaction._doc.amount / 100,
          date: transaction._doc.date.toLocaleString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createTransaction: async (args, req) => {
    const transaction = new Transaction({
      name: args.transactionInput.name,
      description: args.transactionInput.description,
      amount: +(args.transactionInput.amount * 100),
      date: new Date(args.transactionInput.date).toLocaleString(),
      category: args.transactionInput.category,
      user: args.transactionInput.user,
    });
    let createdTransaction;
    try {
      const result = await transaction.save();
      createdTransaction = {
        ...result._doc,
      };
      return createdTransaction;
    } catch (err) {
      console.log(err);
    }
  },
  deleteTransaction: async (args, req) => {
    try {
      const delTransaction = await Transaction.findOneAndRemove({
        _id: args._id
      });
      res.status(200).json(delTransaction)
    } catch (err) {
      res.status(500).json(err)
    }
  },
};
