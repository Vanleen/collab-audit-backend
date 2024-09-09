// src/api.js
import axios from "axios";

const API_URL = "https://localhost:5000/api/users"; // URL de ton backend

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};
