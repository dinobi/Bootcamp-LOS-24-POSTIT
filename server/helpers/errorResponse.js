const errorResponse = (res, statusCode, message, error) => {
  switch (statusCode) {
    case 400:
      res.status(400).send({
        error: {
          message,
          status: 400
        }
      });
      break;
    case 401:
      res.status(401).send({
        error: {
          message,
          status: 401
        }
      });
      break;
    case 403:
      res.status(403).send({
        error: {
          message,
          status: 403
        }
      });
      break;
    case 404:
      res.status(404).send({
        error: {
          message,
          status: 404
        }
      });
      break;
    case 409:
      res.status(409).send({
        error: {
          message,
          status: 409
        }
      });
      break;
    case 413:
      res.status(413).send({
        error: {
          message,
          status: 413
        }
      });
      break;
    case 500:
      res.status(500).send({
        error: error.message, status: 500
      });
      break;
    case 503:
      res.status(503).send({
        error: error.message, status: 503
      });
      break;
    default:
      return res.status(500).send({
        error, status: 500
      });
  }
};

export default errorResponse;
