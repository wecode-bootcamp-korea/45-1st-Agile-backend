const pwValidationCheck = (pw) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  if (!pwValidation.test(pw)) {
    const error = new Error('PASSWORD_IS_NOT_VALID');
    error.statusCode = 409;
    throw error;
  }
};

const emailValidationCheck = (email) => {
  const emailValidation = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  if (!emailValidation.test(email)) {
    const error = new Error('EMAIL_IS_NOT_VALID');
    error.statusCode = 409;
    throw error;
  }
};

module.exports = {
  pwValidationCheck,
  emailValidationCheck,
};
