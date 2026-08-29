// ─────────────────────────────────────────────
//  server.js — Point d'entrée du back-end
// ─────────────────────────────────────────────
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ── Middlewares globaux ──────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const contactRoutes = require("./routes/contact");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// ── Health-check ─────────────────────────────
app.get("/", (_req, res) => {
  res.json({ status: "API Portfolio opérationnelle 🚀" });
});

// ── Connexion MongoDB & démarrage ────────────
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState >= 1;
    console.log("✅  MongoDB connecté");
  } catch (err) {
    console.error("❌  Erreur de connexion MongoDB :", err.message);
    throw err;
  }
};

// Middleware pour s'assurer que la base de données est connectée à chaque requête
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({ error: "Erreur de connexion à la base de données" });
  }
});

// Démarrage local si exécuté directement
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () =>
        console.log(`🚀  Serveur lancé sur http://localhost:${PORT}`)
      );
    })
    .catch((err) => {
      console.error("❌  Impossible de démarrer le serveur :", err.message);
    });
}

module.exports = app;
