import { ErrorHandler } from "./errorHandler.js";

export const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Enternal Server Error";

  // if (err.name === "CastError") {
  //   const message = `Resourses not found : ${err.path}`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if (err.name === "Error") {
  //   const message = `Resourses not found : ${err.path}`;
  //   err = new ErrorHandler(message, 400);
  // }

  res.status(err.statusCode).json({
    success: false,
    message: err,
    // message: err.message || "Internal Server Error",
  });
};
