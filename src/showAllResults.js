const resultsContainer = document.querySelector(
  "[data-multiple-results-container]"
);
const resultsList = document.querySelector("[data-multiple-results-list]");
const main = document.querySelector("[data-main]");
export default function sshowAllResults(searchResults) {
  searchResults.forEach((city) => {
    const li = document
      .querySelector("[data-list-template]")
      .content.cloneNode(true).firstElementChild;
    li.textContent = city.name;
    resultsList.append(li);
  });
  resultsContainer.classList.remove("hidden");
  main.classList.add("hidden");
}
