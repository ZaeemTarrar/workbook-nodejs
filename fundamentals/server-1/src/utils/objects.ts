const CleanBlack: Function = (obj: any): object | any => {
  for (let propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName]
    }
  }
  return obj
}

/**
 * Exports
 */
module.exports = {
  CleanBlack,
}
