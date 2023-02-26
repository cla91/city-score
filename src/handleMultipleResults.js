export default function handleMultipleResults(value, citiesList) {
  return citiesList.filter(
    (city) => city.name.includes(value) && city.name.length == value.length
  );
}
