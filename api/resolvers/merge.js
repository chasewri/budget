const Category = require("../../models/category");
const User = require('../../models/user')
const Transaction = require('../../models/transaction')

const { dateToString } = require("../../helper/date");


const transformCategory = (category) => {
  return {
    ...category._doc,
    _id: category.id,
    user: '5f0ff107a407664fee80ae05',
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
