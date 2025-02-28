/**
 * @typedef {function(req, res, next): Promise<void>} AsyncController
 */

/**
 *
 * @param {AsyncController} controller
 * @returns {AsyncController}
 */
const catchErrors = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = catchErrors;
