// ─────────────────────────────────────────────
//  models/Admin.js — Modèle administrateur
// ─────────────────────────────────────────────
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
