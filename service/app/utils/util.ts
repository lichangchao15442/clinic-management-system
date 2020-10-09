
/** 判断某个属性是否有值（为undefined、null、‘’) */
const hasValue = (value) => {
  let isEmpty
  switch (value) {
    case undefined:
      isEmpty = true
      break;
    case null:
      isEmpty = true
      break;
    case '':
      isEmpty = true
      break;
    default:
      isEmpty = false
      break;
  }
  return !isEmpty
}

/** 字符串转换为整数 */
const  toInt = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}


export { hasValue, toInt }