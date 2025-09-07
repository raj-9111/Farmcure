import Crop from "../models/crop.model.js";


export const getScan = (req, res) => {
  res.render("scan", { crop: null });
};

export const postScan = async (req, res) => {
  try {
    const { name, symptoms, disease, treatment } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const crop = new Crop({ name, symptoms, disease, treatment, image });
    await crop.save();

    res.render("scan", { crop });
  } catch (err) {
    res.send("Error: " + err.message);
  }
};
