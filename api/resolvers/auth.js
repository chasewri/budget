const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("Sorry, an account already exists with this email");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 10);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Cannot find user!!!");
    }
    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
      throw new Error("This password isn't working out");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      `${process.env.JWT_KEY}`,
      {
        expiresIn: "12h",
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 12 };
  },
};
