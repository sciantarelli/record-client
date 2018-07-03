import axios from 'axios';

const BASE_URL = 'http://localhost:3001/v1/notes';

const fetchNotes = () => {
  return axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      'X-User-Email': 'admin@test.com',
      'X-User-Token': 'ng6A5tShZSpXN2tUYZaN'
    }
  });
};

export { fetchNotes };