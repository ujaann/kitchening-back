const { INTERNAL_SERVER_ERROR } = require("../utils/constants/http");

/**
 * Error handling middleware for Express.js applications.
 * @typedef {import('express').ErrorRequestHandler} ErrorRequestHandler
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 */
const errorHandler = (err, req, res, next) => {
  console.log(`PATH: ${req.path}`, err);
  res.status(INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = { errorHandler };
