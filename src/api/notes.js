import axios from 'axios';

// TODO: Hardcoded domain
const BASE_URL = 'http://localhost:3001/v1/notes';

const fetchNotes = () => {
  return axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      'X-User-Email': '',
      'X-User-Token': ''
    }
  });
};

export { fetchNotes };