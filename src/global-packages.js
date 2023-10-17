global.express = require("express");
global.app = express();
global.router = express.Router();
global.server = require("http").Server(app);
global.cors = require("cors");
global.morgan = require("morgan");
global.mongoose = require("mongoose");
global.Schema = mongoose.Schema;
global.bcrypt = require("bcrypt");
global.jwt = require("jsonwebtoken");
global._ = require("lodash");
global.path = require("path");
global.crypto=require("crypto");
global.nodemailer=require("nodemailer");

