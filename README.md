# 🖤 Portfolio — Mathis | Développeur Web

Portfolio personnel de développeur web, conçu pour présenter mes projets académiques et personnels.  
Application moderne avec un panneau d'administration protégé permettant la gestion complète des projets (CRUD), l'upload d'images via Cloudinary, et un formulaire de contact.

> **Déployé sur Vercel** — Frontend statique + API serverless.

---

## 🛠 Stack technique

### Frontend

| Technologie        | Version | Rôle                                      |
| ------------------ | ------- | ----------------------------------------- |
| React              | 19.x    | Bibliothèque UI (composants)              |
| Vite               | 8.x     | Bundler / serveur de développement        |
| Tailwind CSS       | 4.x     | Framework CSS utility-first               |
| Framer Motion      | 12.x   | Animations et transitions                 |
| React Router DOM   | 7.x     | Routage côté client (SPA)                 |
| React Hook Form    | 7.x     | Gestion des formulaires                   |

### Backend

| Technologie                 | Version | Rôle                                      |
| --------------------------- | ------- | ----------------------------------------- |
| Node.js                     | 22.x    | Runtime JavaScript serveur                |
| Express                     | 5.x     | Framework HTTP / API REST                 |
| MongoDB / Mongoose          | 9.x     | Base de données NoSQL + ODM               |
| JSON Web Token (JWT)        | 9.x     | Authentification admin                    |
| bcryptjs                    | 3.x     | Hashage des mots de passe                 |
| Cloudinary + Multer         | —       | Upload et hébergement d'images            |
| Nodemailer                  | 9.x     | Envoi d'e-mails (formulaire de contact)   |

### Déploiement

| Service        | Rôle                                          |
| -------------- | --------------------------------------------- |
| Vercel         | Hébergement (frontend statique + API serverless) |
| MongoDB Atlas  | Base de données cloud                         |
| Cloudinary     | CDN et stockage d'images                      |

---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** ≥ 22.x — [télécharger](https://nodejs.org/)
- **npm** ≥ 10.x (inclus avec Node.js)
- **Git** — [télécharger](https://git-scm.com/)

Vous aurez également besoin de comptes sur :

- [MongoDB Atlas](https://www.mongodb.com/atlas) — base de données cloud
- [Cloudinary](https://cloudinary.com/) — hébergement d'images
- Un service e-mail SMTP (Gmail, etc.) — pour le formulaire de contact

---

## 📥 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/<votre-utilisateur>/portfolio.git
cd portfolio
```

### 2. Installer les dépendances

```bash
# Dépendances racine (dépendances backend partagées pour Vercel)
npm install

# Dépendances frontend
cd frontend
npm install
cd ..

# Dépendances backend
cd backend
npm install
cd ..
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend/` :

```env
# ── MongoDB ──────────────────────────────────
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# ── JWT ──────────────────────────────────────
JWT_SECRET=votre_secret_jwt

# ── Cloudinary ───────────────────────────────
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# ── Admin (utilisé par le seed) ──────────────
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=votre_mot_de_passe

# ── E-mail (Nodemailer) ─────────────────────
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
EMAIL_TO=destinataire@example.com
```

> ⚠️ Le fichier `.env` est ignoré par Git (`.gitignore`). Ne le commitez jamais.

---

## 🚀 Lancement en développement

Ouvrez **deux terminaux** :

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev
```

```bash
# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Le frontend est accessible sur `http://localhost:5173` et appelle l'API sur `http://localhost:5000`.

---

## 🌱 Seed de la base de données

Pour initialiser la base avec un compte admin et des projets par défaut :

```bash
cd backend
npm run seed
```

> Cela crée l'admin avec les identifiants définis dans `.env` et insère les projets d'exemple.

---

## 📦 Build de production

Depuis la racine du projet :

```bash
npm run build
```

Cela installe les dépendances frontend et génère le bundle optimisé dans `frontend/dist/`.

---

## 📁 Structure du projet

```
portfolio/
├── backend/
│   ├── config/            # Configuration Cloudinary
│   ├── controllers/       # Logique métier (auth, projets, contact)
│   ├── middleware/         # Middleware JWT
│   ├── models/            # Schémas Mongoose (Admin, Project)
│   ├── routes/            # Routes Express (auth, projets, contact)
│   ├── seed.js            # Script d'initialisation de la BDD
│   ├── server.js          # Point d'entrée Express
│   └── package.json
├── frontend/
│   ├── public/            # Assets statiques (images, favicon)
│   ├── src/
│   │   ├── components/    # Composants React (Navbar, ProjectCard, etc.)
│   │   ├── pages/         # Pages (Home, Login, AdminDashboard)
│   │   ├── assets/        # Assets importés
│   │   ├── App.jsx        # Routage principal
│   │   ├── main.jsx       # Point d'entrée React
│   │   └── index.css      # Styles globaux
│   ├── index.html         # Template HTML
│   ├── vite.config.js     # Configuration Vite
│   └── package.json
├── api/                   # Serverless function (Vercel)
├── vercel.json            # Configuration de déploiement Vercel
├── package.json           # Scripts racine (build)
└── README.md
```

---

## ☁️ Déploiement sur Vercel

Le projet est configuré pour un déploiement sur [Vercel](https://vercel.com/) :

- Le fichier `vercel.json` configure :
  - Le **build** du frontend (`npm --prefix frontend install && npm --prefix frontend run build`)
  - Le **répertoire de sortie** (`frontend/dist`)
  - Les **rewrites** : `/api/*` → fonction serverless, tout le reste → `index.html` (SPA)
- Les **variables d'environnement** doivent être configurées dans les paramètres du projet Vercel (identiques au `.env` local).

---

## 📝 Scripts disponibles

| Commande                    | Emplacement | Description                                |
| --------------------------- | ----------- | ------------------------------------------ |
| `npm run build`             | racine      | Build de production du frontend            |
| `npm run dev`               | frontend/   | Serveur de développement Vite (HMR)        |
| `npm run build`             | frontend/   | Build de production Vite                   |
| `npm run preview`           | frontend/   | Prévisualisation du build                  |
| `npm run lint`              | frontend/   | Linting avec OxLint                        |
| `npm run dev`               | backend/    | Serveur Express avec watch mode            |
| `npm start`                 | backend/    | Serveur Express (production)               |
| `npm run seed`              | backend/    | Initialisation de la BDD                   |

---

## 📄 Licence

Projet réalisé dans le cadre d'une formation en développement web.
