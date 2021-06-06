module.exports = (
  code: number,
  msg: string,
  data: object | any | null = null,
): object | any => {
  return {
    response: {
      status: code,
      message: msg,
      data: data,
    },
  }
}
