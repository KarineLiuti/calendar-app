import cities from '../assets/constants/cities';

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

/*
 * @KarineLiuti
 * Dear reviewer, this API just returns the weather for
 * current date (dt value in response object).
 * In that case, to get the weather information, * I'm considering only
 * events that has been saved in the same date. This is the condition that I assumed
 * to call this API.
*/
const getWeather = (cityName) => new Promise((resolve, reject) => {
  const city = cities.find((currentCity) => currentCity.city === cityName);

  /*
    * TODO: @KarineLiuti
    * Set API key in .env file
  */
  const appId = '8b1f6feae966a97e2bc834ce00e84d78';
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${appId}`;

  fetch(URL, requestOptions).then((response) => response.text())
    .then((result) => {
      resolve(JSON.parse(result));
    })
    .catch((error) => reject(error));
});

export default getWeather;
