import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: Number },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: []
    }
  ],
  orders: {
    type: Array,
    default: []
  },
  picture: { type: String }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

