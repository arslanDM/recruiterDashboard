const messages = {
  signUp: "User Signed Up Successfully!",
  logIn: "User Logged In Successfully!",
  notExist: (entity) => `${entity} does not exist`,
  notMatch: "Credentials does not match!",
  alreadyExist: (entity) => `${entity} already exist`,
  notPresent: "Field is required!",
  notEmpty: "Field cannot be empty!",
  inValidEmail: "Please Enter a valid Email",
  invalidLength: (length) => `Should be longer than ${length}`,
};
global.messages = messages;
