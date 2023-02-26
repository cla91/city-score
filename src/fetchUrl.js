import errorHandler from "./errorHandler";

export default async function fetchUrl(url) {
  try {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    if (response.status == 404)
      errorHandler("The page you requested was not found.", true);
  } catch {
    errorHandler("A Network error occurred. Try again later.", true);
  }
}
