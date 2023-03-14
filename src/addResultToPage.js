import fetchUrl from "./fetchUrl";
import createCategoryElement from "./createCategoryElement";
import get from "lodash/get";
import animation from "./animation";
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
    const categories = get(city, "categories");
    const summary = get(city, "summary")
      .replace(/<b>/g, "<em>")
      .replace(/<\/b>/g, "</em>");
    const cityScore = get(city, "teleport_city_score").toFixed(2);

    cityTitleName.textContent = cityName;
    citySummary.innerHTML = summary;
    animation(totalScoreProgressBar, Math.round(cityScore) * 3.6);
    totalScoreValue.textContent = `${cityScore}%`;

    categoriesList.textContent = "";
    categories.forEach((category) =>
      categoriesList.append(createCategoryElement(category))
    );
    header.classList.add("header-minimize");
    main.classList.remove("hidden");
  });
}
