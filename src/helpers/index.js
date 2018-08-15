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

export {
  deletePropertyFromObject,
  propertiesDoMatch,
  isEmptyObject,
  dirtyRecordsExist
};