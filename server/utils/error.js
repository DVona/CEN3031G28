export const errorhandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

// adapted from: https://github.com/sahandghavidel/mern-blog/tree/main