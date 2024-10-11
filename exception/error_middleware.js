function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status).json({ error: err.message });
}

export default errorHandler;