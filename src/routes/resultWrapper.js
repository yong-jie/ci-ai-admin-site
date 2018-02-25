/**
 * Wraps the result in an object that has a sucess: true param.
 * All data goes to the result param.
 * @param result - The data to return in the result param
 * @returns {{success: boolean, result: *}}
 */
export const success = result => ({
  success: true,
  result,
});

/**
 * Wraps the result in an object that has a success: false param.
 * All data goes to the reason param.
 * @param reason - The reason why there was an error
 * @returns {{success: boolean, error: *}}
 */
export const error = reason => ({
  success: false,
  error: reason,
});
