const Category = require("../../models/category");
const User = require('../../models/user')
const Transaction = require('../../models/transaction')

const { dateToString } = require("../../helper/date");


const transformCategory = (category) => {
  return {
    ...category._doc,
    _id: category.id,
    user: user.bind(this, category._doc.user),
  };
};

const transformTransaction = transaction => {
  return {
    ...transaction._doc,
    _id: transaction.id,
    date: dateToString(transaction._doc)

  }
}

exports.transformCategory = transformCategory
