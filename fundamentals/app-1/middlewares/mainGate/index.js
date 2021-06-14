module.exports = (req, res, next) => {
  const details = {
    Method: req.method,
    Url: req.url,
    Headers: req.headers,
    Body: req.body,
    Parameters: req.params,
    Queries: req.query,
  }
  console.log(details)
  next()
}
