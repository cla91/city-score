const dataList = document.querySelector("[data-dataList]");

export default function addDataListItem(value, citiesList) {
  if (value == "") {
    dataList.innerHTML = "";
    return;
  }
  dataList.innerHTML = "";
  const filteredCitiesList = citiesList.filter((city) =>
    city.name.toLowerCase().startsWith(value.toLowerCase())
  );
  filteredCitiesList.forEach((city) => {
    const option = document.createElement("option");
    option.setAttribute("value", city.name);
    dataList.append(option);
  });
}
