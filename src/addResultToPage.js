import fetchUrl from "./fetchUrl";
import createCategoryElement from "./createCategoryElement";

const cityTitleName = document.querySelector("[data-city-name]");
const citySummary = document.querySelector("[data-city-summary]");
const totalScoreProgressBar = document.querySelector(
  "[data-circular-progress]"
);
const totalScoreValue = document.querySelector("[data-total-score-value]");
const categoriesList = document.querySelector("[data-categories-list]");
const header = document.querySelector("[data-header]");
const main = document.querySelector("[data-main]");
export default function addResultToPage(cityName, cityUrl) {
  fetchUrl(`${cityUrl}scores/`).then((city) => {
    const categories = city.categories;
    const summary = city.summary
      .replace(/<b>/g, "<em>")
      .replace(/<\/b>/g, "</em>");
    const cityScore = city.teleport_city_score.toFixed(2);

    cityTitleName.textContent = cityName;
    citySummary.innerHTML = summary;
    totalScoreProgressBar.style.background = `conic-gradient(hsl(var(--primary-color)) ${
      Math.round(cityScore) * 3.6
    }deg, #fff 0deg`;
    totalScoreValue.textContent = `${cityScore}%`;

    categoriesList.textContent = "";
    categories.forEach((category) =>
      categoriesList.append(createCategoryElement(category))
    );
    header.classList.add("header-minimize");
    main.classList.remove("hidden");
  });
}
