const API_key = '99a47667da94293b170746befa35c823';

function getWeatherForecast(callback) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&cnt=12&appid=${API_key}`;
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log(data);
          callback(data);
        } else {
          console.error('err');
          callback(null);
        }
      }
    };
  
    xhr.open('GET', url);
    xhr.send();
  }