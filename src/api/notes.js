import axios from 'axios';

const BASE_URL = 'http://localhost:3001/v1/notes';

const fetchNotes = () => {
  axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      'X-User-Email': '',
      'X-User-Token': ''
    }
  }).then(response => console.log(response));
};

export { fetchNotes };