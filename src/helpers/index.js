// eslint-disable-next-line
const deletePropertyFromObject = ({[key]: _, ...newObj}, key) => newObj;

export { deletePropertyFromObject };