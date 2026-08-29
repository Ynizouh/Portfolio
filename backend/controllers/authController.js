// ─────────────────────────────────────────────
//  controllers/authController.js — Login admin
// ─────────────────────────────────────────────
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * POST /api/auth/login
 * Body : { email, password }
 * Retourne un token JWT valide 24 h
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // Recherche de l'admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    // Génération du JWT (expire dans 24 h)
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, message: "Connexion réussie ✅" });
  } catch (err) {
    console.error("Erreur login :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
