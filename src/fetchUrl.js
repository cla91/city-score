import errorHandler from "./errorHandler";
import axios from "axios";

export default async function fetchUrl(url) {
  try {
    const response = await axios.get(url);
    if (response.status == 200) return response.data;

    if (response.status == 404)
      errorHandler("The page you requested was not found.", true);
  } catch {
    errorHandler("A Network error occurred. Try again later.", true);
  }
}
