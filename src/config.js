const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://file-note-saver-7101a6fc8453.herokuapp.com"
    : "http://localhost:5000";

export default API_BASE_URL;
