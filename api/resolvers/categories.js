const Category = require("../../models/category");

module.exports = {
  categories: async (args, req) => {
    try {
      const categories = await Category.find({
        user: args.userId,
        // user: args.
      }).populate("user");
      return categories.map((category) => {
        return {
          ...category._doc,
          _id: category.id,
          // user: category.user,
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args) => {
    // if (!req.Auth) {
    //   throw new Error("Visitor is not authenticated!");
    // }
    const category = new Category({
      name: args.categoryInput.name,
      user: args.categoryInput.id,
      // user: args.categoryInput.user
    });
    let createdCategory;
    try {
      const result = await category.save();
      createdCategory = {
        ...result._doc,
        _id: result._doc._id.toString(),
      };

      return createdCategory;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteCategory: async (args) => {
    try {
      const delCategory = await Category.findByIdAndRemove({
        _id: args._id,
      });
      res.status(200).json(delCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
