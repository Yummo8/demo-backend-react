const { Schema, model, default: mongoose } = require("mongoose");

const CommentSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Comment", CommentSchema);
