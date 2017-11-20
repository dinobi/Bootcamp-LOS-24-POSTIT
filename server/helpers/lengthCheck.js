import errorResponse from './errorResponse';

const lengthCheck = (res, name, desc) => {
  const nameLength = name.split('').length;
  const descriptionLength = desc.split('').length;
  if (descriptionLength > 40) {
    const message = 'description is too large. max of 40 characters is allowed';
    return errorResponse(res, 413, message, null);
  }
  if (nameLength > 18) {
    const message = 'groupname is too large. max of 18 characters is allowed';
    return errorResponse(res, 413, message, null);
  }
  return 'validLength';
};

export default lengthCheck;
