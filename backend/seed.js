// ─────────────────────────────────────────────
//  seed.js — Initialise la BDD avec l'admin
//            et les projets par défaut
// ─────────────────────────────────────────────
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("./models/Admin");
const Project = require("./models/Project");

// ── Projets par défaut ───────────────────────
const defaultProjects = [
  {
    title: "Qwenta",
    description:
      "Application web d'agencement de menus pour la restauration. " +
      "Projet académique réalisé dans le cadre de ma formation en développement web, " +
      "couvrant la planification, la veille technologique et la gestion de projet Agile.",
    imageUrl: "",
    stack: ["HTML", "CSS", "JavaScript", "Agile / Kanban"],
    githubUrl: "",
    liveUrl: "",
    isAcademic: true,
  },
  {
    title: "Algorithmes de Trading",
    description:
      "Développement de stratégies de trading automatisées en Pine Script et MetaTrader 5 (MQL5). " +
      "Optimisation des sessions de trading et focus sur l'actif XAU/USD (Gold). " +
      "Backtesting, gestion du risque et analyse quantitative des performances.",
    imageUrl: "",
    stack: ["Pine Script", "MQL5", "MetaTrader 5", "TradingView"],
    githubUrl: "",
    liveUrl: "",
    isAcademic: false,
  },
];

// ── Exécution ────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅  MongoDB connecté pour le seeding");

    // --- Admin ---
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });
    console.log(`👤  Admin créé : ${process.env.ADMIN_EMAIL}`);

    // --- Projets ---
    await Project.deleteMany({});
    await Project.insertMany(defaultProjects);
    console.log(`📁  ${defaultProjects.length} projets insérés`);

    console.log("\n🌱  Seed terminé avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("❌  Erreur lors du seed :", err.message);
    process.exit(1);
  }
}

seed();
