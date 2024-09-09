const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUserByUsername,
} = require("../controllers/userController");
const auth = require("../middleware/auth"); // Assurez-vous que ce chemin est correct

const router = express.Router();

// Route pour inscrire un utilisateur
router.post("/register", registerUser);

// Route pour la connexion d'un utilisateur
router.post("/login", loginUser);

// Route protégée pour obtenir le profil de l'utilisateur
router.get("/profile", auth, getUserProfile);

// Route pour supprimer un compte utilisateur par username
router.delete("/delete/:username", deleteUserByUsername);

module.exports = router;
