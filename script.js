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

function searchHandler(e) {
    e.preventDefault();
    getWeatherForecast(function (data) {
      if (!data) {
        container.innerHTML = '<p class="not">not a country<p/>';
        return;
      }
      console.log(data);
      const dataList = data.list.map((e) => e);
      container.innerHTML = '';
      dataList.forEach((e) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
  
        const img = document.createElement('img');
        img.src = `http://openweathermap.org/img/w/${e.weather[0].icon}.png`;
        itemDiv.appendChild(img);
  
        const tempH1 = document.createElement('h1');
        tempH1.textContent = `${e.main.temp.toFixed(1)}°C`;
        itemDiv.appendChild(tempH1);
  
        const dateTimeP = document.createElement('p');
        dateTimeP.textContent = e.dt_txt;
        itemDiv.appendChild(dateTimeP);
  
        const minTempSpan = document.createElement('span');
        minTempSpan.textContent = `Minimal ${e.main.temp_min.toFixed()} °C`;
        itemDiv.appendChild(minTempSpan);
  
        const maxTempSpan = document.createElement('span');
        maxTempSpan.textContent = `Maximal ${e.main.temp_max.toFixed(1)} °C`;
        itemDiv.appendChild(maxTempSpan);
  
        const windArrowH1 = document.createElement('h1');
        windArrowH1.style.transform = `rotate(${e.wind.deg}deg)`;
        windArrowH1.textContent = '\u2191';
        itemDiv.appendChild(windArrowH1);
  
        container.appendChild(itemDiv);
      });
    });
  }
  
  form.addEventListener('submit', searchHandler);