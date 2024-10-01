// class ErrorHandler extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     // message,
//     errors = [],
//     stack = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     // this.statusCode = statusCode || 500;
//     this.data = null;
//     this.message = message;
//     // this.message = message || "Something went wrong";
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ErrorHandler };

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
