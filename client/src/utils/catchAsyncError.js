export default function catchAsyncError(fn) {
    return async (...args) => {
        try {
            const data = await fn(...args);
            return data;
        } catch (err) {
            const res = err.response;
            if (res.status === 500 && typeof res.data === 'string') return { error: true, message: 'Internal Server Error' };
            return res.data;
        }
    };
}
