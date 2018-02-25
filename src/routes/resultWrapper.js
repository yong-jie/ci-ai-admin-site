export const success = result => ({
  success: true,
  result,
});

export const error = reason => ({
  success: false,
  error: reason,
});
