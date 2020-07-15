const Category = require("../../models/category");

const { dateToString } = require("../../helper/date");

const transformCategory = (category) => {
  return {
    ...category._doc,
    _id: category.id,
    user: user.bind(this, category._doc.user),
  };
};

exports.transformCategory = transformCategory
