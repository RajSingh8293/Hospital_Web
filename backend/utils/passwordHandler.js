import bcryptjs from "bcryptjs";

export const authHashPassword = (password) => {
  const hashPassword = bcryptjs.hashSync(password, 8);
  return hashPassword;
};

export const comparePassword = (password, hashPassword) => {
  const isMatch = bcryptjs.compareSync(password, hashPassword);
  return isMatch;
};
