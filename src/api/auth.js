// TODO: Refactor common axios into config type setup
import axios from 'axios';

// TODO: Hardcoded domain
const BASE_URL = 'http://localhost:3001/v1/sessions';

const postAuthUser = ({ email='', password=''}) => {
  return axios({
    method: 'post',
    url: BASE_URL,
    data: {
      email,
      password
    }
  });
};

export { postAuthUser };