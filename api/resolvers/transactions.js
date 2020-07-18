const Transaction = require("../../models/transaction");
const { datetoString } = require("../../helper/date");

module.exports = {
  transactions: async (args, req) => {
    try {
      const transactions = await Transaction.find({
        user: args.userId,
        // user: args.user
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
      //   category: "5f106f94ed21be267e921cd1",
      category: args.transactionInput.category,
      //   user: "5f0ff107a407664fee80ae05",
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
      throw err;
    }
  },
};
