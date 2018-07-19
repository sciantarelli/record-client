const deletePropertyFromObject = ({[key]: _, ...newObj}, key) => newObj;

export { deletePropertyFromObject };