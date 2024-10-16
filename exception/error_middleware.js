function errorHandler(err, req, res) {
  console.error(err.stack);
  res.status(err.status).json({error: err.message});
}

export default errorHandler;
