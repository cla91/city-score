export default function createCategoryElement(category) {
  const li = document
    .querySelector("[data-category-template]")
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
