const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Récupérer l'en-tête d'autorisation
  const authHeader = req.headers["authorization"];

  // Vérifier si l'en-tête d'autorisation est fourni
  if (!authHeader) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  // Extraire le token JWT à partir de l'en-tête (après 'Bearer ')
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token manquant ou mal formaté." });
  }

  try {
    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations décodées du token à req.user
    req.user = decoded;

    // Passer au middleware suivant ou à la route
    next();
  } catch (error) {
    // Gérer les erreurs liées au token invalide ou expiré
    return res.status(400).json({ message: "Token invalide." });
  }
};
