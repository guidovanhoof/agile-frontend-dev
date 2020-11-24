import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/h10o9iDRDvUjumRkS7i4olbIUhifj0NG',
});

const api = {
  loadRestaurants() {
    console.log('loadRestaurants()');
    return client.get('/restaurants').then(response => response.data);
  },
};

export default api;
