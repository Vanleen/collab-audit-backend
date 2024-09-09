const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fonction pour inscrire un utilisateur
exports.registerUser = async (req, res) => {
  const { username, password, email, role, sirenOrSiret } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
      sirenOrSiret: role === 'entreprise' ? sirenOrSiret : null,
    });

    return res.status(201).json({ message: "Utilisateur créé avec succès.", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de l'inscription.", error });
  }
};

// Fonction pour connecter un utilisateur
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Trouver l'utilisateur
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retourner le token et les informations de l'utilisateur
    return res.status(200).json({ message: "Connexion réussie", token, user: { username: user.username, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la connexion.", error });
  }
};

// Fonction pour obtenir le profil utilisateur
exports.getUserProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Retourner les informations de l'utilisateur
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération du profil.", error });
  }
};

// Fonction pour supprimer un compte utilisateur par username
exports.deleteUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    // Rechercher l'utilisateur à supprimer
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Supprimer l'utilisateur
    await user.destroy();
    return res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error });
  }
};
