// Try to get API key from environment variable
let API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Only show warning in development if API key is missing
if (!API_KEY) {
  if (import.meta.env.MODE === 'development') {
    console.warn('News API key not found in environment variables. Using development fallback.');
  } else if (import.meta.env.MODE === 'production') {
    console.error('News API key is required for production');
    // In production, you might want to handle this more gracefully
  }
}

const PROXY_URL = "https://nomoreparties.co/news/v2/everything";
const NUMBER_CARDS = 3;
const NUMBER_ARTICLES = 100;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export {
  API_KEY,
  PROXY_URL,
  NUMBER_CARDS,
  NUMBER_ARTICLES,
  BASE_URL,
};