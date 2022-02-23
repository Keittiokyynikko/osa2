import axios from 'axios';
const baseUrl = 'https://restcountries.eu/rest/v2/name';
const baseUrl2 = 'https://restcountries.eu/rest/v2/all';

const getAll = () => {
  const request = axios.get(baseUrl2)
  return request.then(response => response.data)
}

const getLand = (name) => {
  const request = axios.get(`${baseUrl}/${name}`)
  return request.then(response => response.data)
}

export default {getAll, getLand};
