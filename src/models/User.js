import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  socialonly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

/* userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
}); */

userSchema.static("hashPassword", function (password) {
  password = bcrypt.hash(password, 5);
  return password;
});

const User = mongoose.model("user", userSchema);
export default User;
