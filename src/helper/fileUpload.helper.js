const multer = require("multer");
const path = require("path");
const express = require("express");
const fs = require("fs");
const errorHelper = require("../helper/error.helper");
const uploadPath = process.env.UPLOAD_PATH || "public/uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // if folder doesn't exist, create it
    try {
      let [publicFolderPath, uploadFolderPath] = uploadPath.split("/");
      if (!fs.existsSync(publicFolderPath)) {
        fs.mkdirSync(publicFolderPath);
        fs.mkdirSync(uploadPath);
      } else {
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath);
        }
      }
      cb(null, uploadPath);
    } catch (error) {
      throw new Error("Something went wrong");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4 | pdf |txt)$/
    )
  ) {
    let message = "Only jpg and png files allowed!";

    cb(errorHelper.requestfailure(res, message), false);
  }
  cb(null, true);
};

const FileUpload = multer({
  storage,
  fileFilter,
});

module.exports = { FileUpload };
