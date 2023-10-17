module.exports.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports.comparePassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};
