const Category = require("../../models/category");

const { transformCategory } = require("./merge");

module.exports = {
  categories: async (args, req) => {
    try {
      const categories = await Category.find({
        user: args.userId,
        // user: args.
      }).populate('user');
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
      user: arg.categoryInput.id,
      // user: args.categoryInput.user
    });
    let createdCategory;
    try {
      const result = await category.save();
      createdCategory = {
        ...result._doc,
        _id: result._doc._id.toString(),
      };
      // const user = await User.findById({_id :'5f0ff107a407664fee80ae05'});

      // if (!user) {
      //   throw new Error("User is not found!");
      // }

      return createdCategory;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
