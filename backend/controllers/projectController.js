// ─────────────────────────────────────────────
//  controllers/projectController.js — CRUD Projets
// ─────────────────────────────────────────────
const Project = require("../models/Project");
const { cloudinary } = require("../config/cloudinary");

// ── GET /api/projects — Public (uniquement visibles) ─
exports.getAll = async (_req, res) => {
  try {
    const projects = await Project.find({ isVisible: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Erreur getAll :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── GET /api/projects/admin/all — Protégé (tous les projets) ─
exports.getAllAdmin = async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Erreur getAllAdmin :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── GET /api/projects/:id — Public ───────────
exports.getOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Projet introuvable." });
    }
    res.json(project);
  } catch (err) {
    console.error("Erreur getOne :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── POST /api/projects — Protégé (JWT) ───────
exports.create = async (req, res) => {
  try {
    const { title, description, stack, githubUrl, liveUrl, isAcademic } = req.body;

    // L'image est uploadée par Multer → Cloudinary
    const imageUrl = req.file ? req.file.path : "";

    const { isVisible } = req.body;

    const project = await Project.create({
      title,
      description,
      imageUrl,
      stack: stack ? JSON.parse(stack) : [],
      githubUrl: githubUrl || "",
      liveUrl: liveUrl || "",
      isAcademic: isAcademic === "true" || isAcademic === true,
      isVisible: isVisible === undefined ? true : isVisible === "true" || isVisible === true,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("Erreur create :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── PUT /api/projects/:id — Protégé (JWT) ────
exports.update = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Projet introuvable." });
    }

    const { title, description, stack, githubUrl, liveUrl, isAcademic } = req.body;

    // Si une nouvelle image est envoyée, supprimer l'ancienne de Cloudinary
    if (req.file) {
      if (project.imageUrl) {
        const publicId = extractPublicId(project.imageUrl);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      project.imageUrl = req.file.path;
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (stack !== undefined) project.stack = JSON.parse(stack);
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (isAcademic !== undefined)
      project.isAcademic = isAcademic === "true" || isAcademic === true;

    const { isVisible } = req.body;
    if (isVisible !== undefined)
      project.isVisible = isVisible === "true" || isVisible === true;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("Erreur update :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── DELETE /api/projects/:id — Protégé (JWT) ─
exports.remove = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Projet introuvable." });
    }

    // Supprime l'image sur Cloudinary avant de supprimer le document
    if (project.imageUrl) {
      const publicId = extractPublicId(project.imageUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Projet supprimé ✅" });
  } catch (err) {
    console.error("Erreur remove :", err.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── Utilitaire : extraire le public_id Cloudinary ─
function extractPublicId(url) {
  try {
    // URL type : https://res.cloudinary.com/<cloud>/image/upload/v123/portfolio-projects/abc123.jpg
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const pathWithExt = parts[1].split("/").slice(1).join("/"); // retire le vXXX
    return pathWithExt.replace(/\.[^/.]+$/, ""); // retire l'extension
  } catch {
    return null;
  }
}
