// export const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((error) =>
//       next(error)
//     );
//   };
// };

export const asyncHandler = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch(next);
  // Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
};
