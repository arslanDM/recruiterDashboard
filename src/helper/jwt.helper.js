module.exports.signToken = async (id, expiresIn = "24h") => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
  return token;
};
