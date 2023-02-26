const errorContainer = document.querySelector("[data-error-container]");

export default function errorHandler(message, showContainer) {
  if (showContainer) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");
  }
}
