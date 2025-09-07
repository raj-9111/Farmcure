import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";


import userRoutes from "./routes/userRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";


const app = express();

  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

// ================== SESSION & FLASH ==================
app.use(
  session({
    secret: "farmcure_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.session.user || null;
  next();
});

// ================== ROUTES ==================
app.get("/", (req, res) => res.render("index"));
app.get("/how", (req, res) => res.render("i"));
app.get("/about", (req, res) => {
  const team = [
    { name: "Shreyans", role: "Lead Developer", skills: "Node.js, Express, MongoDB", experience: "3+ years", image: "", borderColor: "border-blue-400", color: "text-blue-600" },
    { name: "Teammate A", role: "ML Engineer", skills: "Python, CNNs, CV", experience: "2+ years", image: "", borderColor: "border-green-400", color: "text-green-600" },
    { name: "Teammate B", role: "UI/UX", skills: "Figma, Tailwind", experience: "2+ years", image: "", borderColor: "border-purple-400", color: "text-purple-600" },
  ];
  res.render("about", { team });
});
app.get("/services", (req, res) => {
  const services = [
    { icon: "leaf", color: "green", title: "Disease Detection", description: "Upload a photo and detect plant diseases instantly." },
    { icon: "medkit", color: "red", title: "Treatment Guidance", description: "Get actionable treatment suggestions tailored to your crop." },
    { icon: "cloud-upload", color: "blue", title: "Image Upload", description: "Secure and fast uploads for quick diagnosis." },
  ];
  res.render("services", { services });
});
app.get("/help", (req, res) => {
  const faqs = [
    { question: "How do I scan a plant?", answer: "Go to Scan, upload a clear photo, and click Analyze." },
    { question: "Is my data private?", answer: "Yes. We do not share your photos or data." },
    { question: "What plants are supported?", answer: "Most common crops; we keep expanding the dataset." },
  ];
  res.render("help", { faqs });
});
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    req.flash("error", "You must log in first");
    return res.redirect("/users/login");
  }
  res.render("profile", { user: req.session.user });
});
app.get("/users/profile", (req, res) => {
  if (!req.session.user) {
    req.flash("error", "You must log in first");
    return res.redirect("/users/login");
  }
  res.render("profile", { user: req.session.user });
});


app.use("/users", userRoutes);
app.use("/scan", cropRoutes);

// ================== DATABASE ==================
mongoose
  .connect("mongodb://127.0.0.1:27017/farmcure", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
