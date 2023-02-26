export default function searchResult(value, citiesList) {
  value = value.toLowerCase();

  return citiesList.filter((city) => city.name.toLowerCase().includes(value));
}
