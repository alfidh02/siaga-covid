const covid_api_base = 'https://apicovid19indonesia-v2.vercel.app/api/';

const fetchRequest = (url) => fetch(url)
  .then((response) => response.json());

const covidApi = {
  getSummary: () => fetchRequest(covidApiEndPoints.summary())
    .then((responseJson) => (responseJson.lastUpdate ? Promise.resolve(responseJson) : Promise.reject('Endpoint tidak ditemukan'))),

  getProvinceCases: () => fetchRequest(covidApiEndPoints.provinceCases())
    .then((responseJson) => (responseJson ? Promise.resolve(responseJson) : Promise.reject('Endpoint tidak ditemukan'))),
};

const covidApiEndPoints = {
  summary: () => getApiPath('indonesia'),
  provinceCases: () => getApiPath('indonesia/provinsi'),
};

const getApiPath = (end_point) => covid_api_base + end_point;

export default covidApi;
