const header = document.querySelector("[data-header]");
const searchInput = document.querySelector("[data-search-input]");
const searchSubmitButton = document.querySelector("[data-search-btn]");
const searchCitiesList = document.querySelector("[data-cities-list]");
const errorContainer = document.querySelector("[data-error-container]");
const multipleResults = document.querySelector("[data-multiple-results]");
const multipleResultsList = document.querySelector(
  "[data-multiple-results-list]"
);
const cityTitleName = document.querySelector("[data-city-name]");
const mainContainer = document.querySelector("[data-main-container]");
const categoriesList = document.querySelector("[data-categories-list]");
const summaryContainer = document.querySelector("[data-summary]");

fetchUrl("https://api.teleport.org/api/urban_areas/")
  .then((data) => data._links["ua:item"])
  .then((citiesList) => {
    searchInput.addEventListener("input", () => {
      errorHandler("", false);
      addDataListItem(citiesList);
    });
    searchSubmitButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (searchInput.value == "") {
        errorHandler("Empty value", true);
        return;
      }
      handleFindedCities(searchInput.value, citiesList);
    });
  });

function handleFindedCities(inputValue, citiesList) {
  inputValue = inputValue.toLowerCase();
  const result = citiesList.filter((data) =>
    data.name.toLowerCase().startsWith(inputValue)
  );
  if (result.length == 0) {
    errorHandler("The page you requested was not found", true);
  }

  if (result.length == 1) {
    addResultsToPage(result[0].name, result[0].href);
  }
  if (result.length > 1) {
    showAllResult(result);
    multipleResults.addEventListener("click", (event) => {
      event.preventDefault();
      if (!event.target.closest("UL")) return;
      resultsEventHandler();
    });
    multipleResults.addEventListener("keydown", (event) => {
      if (event.key != "Enter") return;
      if (!event.target.closest("UL")) return;
      resultsEventHandler();
    });
    function resultsEventHandler() {
      const clickedCity = event.target.textContent;
      for (let city of result) {
        if (
          city.name.includes(clickedCity) &&
          city.name.length == clickedCity.length
        ) {
          multipleResults.classList.add("hidden");
          multipleResultsList.innerHTML = "";
          addResultsToPage(city.name, city.href);
          mainContainer.classList.remove("hidden");
          window.scrollTo(0, 0);
          break;
        }
      }
    }
    const closeButton = document.querySelector("[data-close-btn]");
    closeButton.addEventListener("click", (event) => {
      if (!event.target.closest("BUTTON")) return;
      multipleResults.classList.add("hidden");
      if (categoriesList.firstElementChild) {
        mainContainer.classList.remove("hidden");
      }
      multipleResultsList.innerHTML = "";
    });
  }
}
function showAllResult(result) {
  result.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.setAttribute("tabindex", 0);
    multipleResultsList.append(li);
  });
  multipleResults.classList.remove("hidden");
  mainContainer.classList.add("hidden");
}
function addResultsToPage(cityName, cityUrl) {
  fetchUrl(`${cityUrl}scores/`).then((result) => {
    const categories = result.categories;
    const summary = result.summary
      .replace(/<b>/g, "<em>")
      .replace(/<\/b>/g, "</em>");
    const cityScore = result.teleport_city_score.toFixed(2);

    cityTitleName.textContent = cityName;
    const circularBar = document.querySelector(".circular-bar-outer");
    circularBar.style.background = `conic-gradient(hsl(var(--primary-color)) ${
      Math.round(cityScore) * 3.6
    }deg, #fff 0deg`;
    const totalScoreValue = document.querySelector("[data-total-score-value]");
    totalScoreValue.textContent = `${cityScore}%`;
    summaryContainer.innerHTML = summary;

    categoriesList.textContent = "";
    categories.forEach((item) => {
      categoriesList.append(createCategoryItem(item));
    });
    header.classList.add("header-minimize");
    mainContainer.classList.remove("hidden");
  });
}
function createCategoryItem(category) {
  const li = document
    .querySelector("[data-categories-list-item]")
    .content.cloneNode(true);
  const name = li.querySelector("[data-category-name]");
  const score = li.querySelector("[data-category-score]");
  const progressBar = li.querySelector("[data-progress-bar]");
  name.textContent = category.name;
  score.textContent = category.score_out_of_10.toFixed(2);
  progressBar.style.background = `linear-gradient(to right, ${
    category.color
  } ${Math.round(category.score_out_of_10 * 10)}%, transparent ${Math.round(
    category.score_out_of_10 * 10
  )}%)`;
  return li;
}
function addDataListItem(citiesList) {
  if (searchInput.value == "") {
    searchCitiesList.innerHTML = "";
    return;
  }
  searchCitiesList.innerHTML = "";
  const filteredCitiesList = citiesList.filter((data) =>
    data.name.toLowerCase().startsWith(searchInput.value.toLowerCase())
  );
  filteredCitiesList.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", element.name);
    searchCitiesList.append(option);
  });
}
async function fetchUrl(url) {
  try {
    let response = await fetch(url);
    if (response.ok) return response.json();
    if (response.status == "404")
      errorHandler("The page you requested was not found.", true);
  } catch {
    errorHandler("A Network error occurred. Try again later.", true);
  }
}
function errorHandler(message, showContainer) {
  if (showContainer) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");
  }
}
