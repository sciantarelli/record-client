// eslint-disable-next-line
const deletePropertyFromObject = ({[key]: _, ...newObj}, key) => newObj;

const propertiesDoMatch = (a, b, props) => {
  for (let i=0; i < props.length; i++) {
    let prop = props[i];

    if (a[prop] !== b[prop]) {
      return false;
    }
  }

  return true;
};

const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0;

const dirtyRecordsExist = (records) => {
  if (isEmptyObject(records)) return false;

  for (let id in records) {
    // skip loop if the property is from prototype
    if (!records.hasOwnProperty(id)) continue;

    if (records[id].isDirty) return true;
  }

  return false;
};

const cleanHeaders = (headers) => {
  if (!headers.hasOwnProperty('access-token')) {
    return headers;
  }

  const accessToken = headers['access-token'];
  const cleanedHeaders =
      deletePropertyFromObject(headers, 'access-token');

  return {
    ...cleanedHeaders,
    accessToken
  };
};

const sortObjectsBy = (list, attr) => {

  if (typeof list === 'object') {
    list = Object.values(list);
  }

  const compare = (a, b) => {
    const aVal = a[attr];
    const bVal = b[attr];

    if ((typeof(aVal) === 'string' || typeof(bVal) === 'string')) {
      return aVal.localeCompare(bVal);
    }

    return aVal - bVal;
  };

  return (list && list.sort(compare)) || [];
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const makeDataKey = (endpoint, open=false) => {
  const pieces = endpoint.split('/');
  pieces.shift();
  let dataKey = `${open ? 'open' : ''}${pieces.shift()}`;

  for (const piece of pieces) {
    dataKey += capitalize(piece);
  }

  return dataKey;
};

export {
    deletePropertyFromObject,
    propertiesDoMatch,
    isEmptyObject,
    dirtyRecordsExist,
    cleanHeaders,
    sortObjectsBy,
    capitalize,
    makeDataKey
};