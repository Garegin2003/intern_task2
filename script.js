const API_KEY = '99a47667da94293b170746befa35c823';
const form = document.querySelector('.form');
const container = document.querySelector('.content__items');
const city = document.querySelector('.city');
const button = document.querySelector('.button');

function getWeatherForecast(callback) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&cnt=12&appid=${API_KEY}`;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
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

function searchHandler(e) {
  e.preventDefault();
  getWeatherForecast(function (data) {
    if (!data) {
      container.innerHTML =
        '<p class="content__item content__item--empty">not a country<p/>';
      return;
    }
    container.innerHTML = '';
    data.list.forEach((e) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('content__item');

      const img = document.createElement('img');
      img.src = `http://openweathermap.org/img/w/${e.weather[0].icon}.png`;
      itemDiv.appendChild(img);

      const temp = document.createElement('h1');
      temp.textContent = `${e.main.temp.toFixed(1)}°C`;
      itemDiv.appendChild(temp);

      const dateTime = document.createElement('p');
      dateTime.textContent = e.dt_txt;
      itemDiv.appendChild(dateTime);

      const minTemp = document.createElement('span');
      minTemp.textContent = `Minimal ${e.main.temp_min.toFixed(1)} °C`;
      itemDiv.appendChild(minTemp);

      const maxTemp = document.createElement('span');
      maxTemp.textContent = `Maximal ${e.main.temp_max.toFixed(1)} °C`;
      itemDiv.appendChild(maxTemp);

      const windArrow = document.createElement('h1');
      windArrow.style.transform = `rotate(${e.wind.deg}deg)`;
      windArrow.textContent = '\u2191';
      itemDiv.appendChild(windArrow);

      container.appendChild(itemDiv);
    });
  });
}

form.addEventListener('submit', searchHandler);
