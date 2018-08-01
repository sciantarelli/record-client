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

export { deletePropertyFromObject, propertiesDoMatch };