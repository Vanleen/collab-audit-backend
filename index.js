const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Ajoute cette route pour la racine '/'
app.get("/", (req, res) => {
  res.send("Collab Audit Backend is running on HTTP!");
});

// Utiliser HTTP au lieu de HTTPS
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur HTTP lancé sur le port ${PORT}`);
});
