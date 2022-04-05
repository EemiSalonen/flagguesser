export function checkIndex(current, takens) {
  for (let taken of takens) {
    if (taken === current) {
      return true;
    }
  }
  return false;
}
export function randomizeCountry(
  arrayTarget,
  arrayResult,
  amount,
  exclude = 0
) {
  let usedIndexes = [];
  for (let i = 0; i < amount; i++) {
    let index = Math.floor(Math.random() * arrayTarget.length);
    while (
      checkIndex(index, usedIndexes) ||
      arrayTarget[index].name === exclude.name
    ) {
      index = Math.floor(Math.random() * arrayTarget.length);
    }
    usedIndexes.push(index);
    arrayResult.push(arrayTarget[index]);
  }
  return arrayResult;
}

export async function getCountries() {
  const countriesRaw = await fetch('https://restcountries.com/v2/all');
  if (!countriesRaw.ok) {
    throw new Error('Couldn´t get data!');
  }
  const countries = await countriesRaw.json();

  let countryData = countries.filter((country) => country.independent === true);

  return countryData;
}
