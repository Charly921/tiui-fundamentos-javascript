var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();
var fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    try {
      xhttp.open('GET', url_api, false);
      xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState === 4 && xhttp.status === 200)
          resolve(JSON.parse(xhttp.responseText));
        else reject(url_api);
      };
      xhttp.send();
    } catch (error) {
      reject(error);
    }
  });
}

fetchData(API)
  .then(data1 => { 
    console.log('Primer Llamado...');
    console.log(`Personajes:  ${data1.info.count}`);
    return fetchData(API + data1.results[0].id);
  })
  .then(data2 => {
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${data2.name}`);
    return fetchData(data2.origin.url);
  })
  .then(data3 => {
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(error => console.error(`Error ${error}`));
