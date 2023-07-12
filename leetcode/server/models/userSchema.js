const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  tokens: [
    {
      token: String,
    },
  ],
  questionsList: [
    {
      questionID: Schema.Types.ObjectId,
      code:String,
      result: String,
      submissionDateTime: String,
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.LEETCODE);

    this.tokens = this.tokens.concat({ token: token });

    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
