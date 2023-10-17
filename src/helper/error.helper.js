let success=(response,responseData,message)=>{
    let successResponse={
      message:message,
      status:"success",
      responseData:responseData
    }
    let status=200;
    response.status(status).json(successResponse);
}

let systemfailure = (response, err) => {
  let message = [
    "Error in handling this request. ",
    "Please contact system admin.",
  ].join("");
  let status = 500;

  if (typeof err === "object" && err.status) {
    status = err.status;
  }

  if (typeof err === "object" && err.message) {
    message = err.message;
  }

  response.status(status).json({
    status: "Fail",
    systemfailure: true,
    message: message,
    data: null,
  });
};

let requestfailure = (response, err, jsonerr = null) => {
  let status = 404;

  if (typeof err === "object" && err.message) {
    message = err.message;
  } else {
    message = err;
  }

  response.status(status).json({
    status: "Fail",
    systemfailure: false,
    message: message,
    jsonerr: jsonerr,
  });
};

let badRequest = (response, message) => {
  let status = 400;

  response.status(status).json({
    status: "Fail",
    systemfailure: false,
    message: message,
    data: null,
  });
};

module.exports = {
  success:success,
  badRequest: badRequest,
  systemfailure: systemfailure,
  requestfailure: requestfailure,
};