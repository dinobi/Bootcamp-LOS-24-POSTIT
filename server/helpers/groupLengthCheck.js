import errorResponse from './errorResponse';

const groupLengthCheck = (res, name, desc) => {
  const nameLength = name.split('').length;
  const descriptionLength = desc.split('').length;
  if (descriptionLength < 15) {
    const message =
    'description is too short. minimum of 15 characters is allowed';
    return errorResponse(res, 400, message, null);
  }
  if (descriptionLength > 45) {
    const message =
    'description is too long. max of 45 characters is allowed';
    return errorResponse(res, 413, message, null);
  }
  if (nameLength < 3) {
    const message =
    'group name is too short. minimum of 3 characters is allowed';
    return errorResponse(res, 400, message, null);
  }
  if (nameLength > 15) {
    const message =
    'group name is too long. max of 15 characters is allowed';
    return errorResponse(res, 413, message, null);
  }
  return 'validLength';
};

export default groupLengthCheck;
