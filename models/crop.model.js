import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symptoms: { type: String, required: true },
  disease: { type: String, required: true },
  treatment: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
