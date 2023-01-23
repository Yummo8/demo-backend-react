const { Schema, model, default: mongoose } = require("mongoose");

const PostSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
