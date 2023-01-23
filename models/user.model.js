const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    activated: { type: Boolean, default: false },
    activationLink: { type: String },
    avatarUrl: { type: String },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
