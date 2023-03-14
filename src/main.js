"use strict";
import fetchUrl from "./fetchUrl";
import errorHandler from "./errorHandler";
import addDataListItem from "./addDataListItem";
import searchResult from "./searchResult";
import addResultToPage from "./addResultToPage";
import showAllResults from "./showAllResults";
import handleMultipleResults from "./handleMultipleResults";
import get from "lodash/get";

const searchInput = document.querySelector("[data-search-input]");
const form = document.querySelector("[data-form]");
const resultsList = document.querySelector("[data-multiple-results-list]");
const resultsContainer = document.querySelector(
  "[data-multiple-results-container]"
);
const main = document.querySelector("[data-main]");
const closeButton = document.querySelector("[data-button-close]");
const categoriesList = document.querySelector("[data-categories-list]");

// fetch all cities names and their respective url
fetchUrl("https://api.teleport.org/api/urban_areas/")
  .then((data) => {
    return get(data, ["_links", "ua:item"]);
  })
  .then((citiesList) => {
    //add the names as <datalist> element
    searchInput.addEventListener("input", () => {
      errorHandler("", false);
      addDataListItem(searchInput.value, citiesList);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (searchInput.value == "") {
        errorHandler("Empty value", true);
        return;
      }
      // filter results
      const searchResults = searchResult(searchInput.value, citiesList);

      if (searchResults.length == 0)
        errorHandler("The page you requested was not found", true);
      if (searchResults.length == 1)
        addResultToPage(searchResults[0].name, searchResults[0].href);

      // multiple results case: show all results as a list, use event delegation(both for mouse and keyboard navigation) to listen on the single elements and add result to page
      if (searchResults.length > 1) {
        showAllResults(searchResults);
        resultsList.addEventListener("click", (event) => {
          event.preventDefault();
          if (!event.target.closest("LI")) return;
          const result = handleMultipleResults(
            event.target.textContent,
            citiesList
          );
          resultsContainer.classList.add("hidden");
          resultsList.innerHTML = "";
          addResultToPage(result[0].name, result[0].href);
          main.classList.remove("hidden");
          window.scrollTo(0, 0);
        });
        resultsList.addEventListener("keydown", (event) => {
          if (event.key != "Enter") return;
          if (!event.target.closest("LI")) return;
          const result = handleMultipleResults(
            event.target.textContent,
            citiesList
          );
          resultsContainer.classList.add("hidden");
          resultsList.innerHTML = "";
          addResultToPage(result[0].name, result[0].href);
          main.classList.remove("hidden");
          window.scrollTo(0, 0);
        });
        closeButton.addEventListener("click", (event) => {
          if (!event.target.closest("BUTTON")) return;
          resultsContainer.classList.add("hidden");
          if (categoriesList.firstElementChild) main.classList.remove("hidden");
          resultsList.innerHTML = "";
        });
      }
    });
  });
