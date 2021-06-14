module.exports.R = (code = 200, msg = null, data = null) => {
  const result = {
    status: code,
    message: msg,
    data: data || null,
  }
  return result
}
