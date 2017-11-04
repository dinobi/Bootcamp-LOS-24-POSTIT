const lengthCheck = (res, name, desc) => {
  const nameLength = name.split('').length;
  const descriptionLength = desc.split('').length;
  if (descriptionLength > 40) {
    return res.status(413).send({
      error: {
        message: 'description is too large. max of 40 characters is allowed'
      }
    });
  }
  if (nameLength > 18) {
    return res.status(413).send({
      error: {
        message: 'groupname is too large. max of 18 characters is allowed'
      }
    });
  }
  return 'validLength';
};

export default lengthCheck;
