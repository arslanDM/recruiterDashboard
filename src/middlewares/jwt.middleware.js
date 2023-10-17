const { PUBLIC_ROUTES } = require("../constants/route");
const { promisify } = require("util");
const { user: UserModel } = require("../models");
const errorHelper = require("./../helper/error.helper");
module.exports.authenticate = (req, res, next) => {
  for (route of PUBLIC_ROUTES) {
    if (req.url.toLowerCase().includes(route)) {
      return next();
    }
  }
  return verifyToken(req, res, next);
};
const verifyToken = async (req, res, next) => {
  try {
    let token = "";
    if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
      token = req.headers.authorization.split(" ")[1];
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({
      _id: new mongoose.Types.ObjectId(decoded.id),
    }).lean();
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Unable to authenticate the user!",
    });
  }
};

module.exports.restrictTo = (role) => {
  try {
    return (req, res, next) => {
      if (!role.includes(req.user.role)) {
        let message = "You dont have permission to perform this action";
        return errorHelper.requestfailure(res, message);
      }
      next();
    };
  } catch (error) {
    return errorHelper.requestfailure(res, error);
  }
};
