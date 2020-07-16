const Category = require("../../models/category");

const { transformCategory } = require("./merge");

module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return categories.map((category) => {
        return transformCategory(category);
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args, req) => {
    // if (!req.Auth) {
    //   throw new Error("Visitor is not authenticated!");
    // }
    const category = new Category({
      name: args.categoryInput.name,
      user: req.userId,
    });
    let createdCategory;
    try {
      const result = await category.save();
      createdCategory = transformCategory(result);
      const user = await user.findById(req.userId);

      if (!user) {
        throw new Error("User is not found!");
      }

      return createdCategory;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
