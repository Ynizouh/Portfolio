// ─────────────────────────────────────────────
//  routes/project.js — Routes projets
// ─────────────────────────────────────────────
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const {
  getAll,
  getAllAdmin,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/projectController");

// ── Routes publiques ─────────────────────────
router.get("/", getAll);

// ── Routes protégées (JWT + upload image) ────
router.get("/admin/all", auth, getAllAdmin);
router.get("/:id", getOne);
router.post("/", auth, upload.single("image"), create);
router.put("/:id", auth, upload.single("image"), update);
router.delete("/:id", auth, remove);

module.exports = router;
