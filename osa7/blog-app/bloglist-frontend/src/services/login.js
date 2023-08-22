import axios from 'axios';
const baseUrl = '/api/login';

// credentials on muuttujan nimi, voisi olla mikä tahansa
// credentials on ne tiedot mitkä loginille lähetetään
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data; // data sisältää yleensä sen mitä fronttiin halutaan. response.status antaa koodin
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
