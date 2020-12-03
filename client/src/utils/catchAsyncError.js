export default function catchAsyncError(fn) {
  return async (...args) => {
    try {
      const data = await fn(...args);
      return data;
    } catch (err) {
      if (err.response) {
        return err.response.data;
      } else return { error: 'Server error' };
    }
  };
}
