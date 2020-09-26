let name = '';
/**
 * 查找当前路由对应的name
 * @param routes 路由配置文件中的routes（包括各级路由下的routes）
 * @param pathname 当前页面的路由地址
 */
const findPathname = (routes: any, pathname: string) => {
  routes.some((item: any) => {
    if (item.path === pathname) {
      name = item.name;
      return true;
    } else if (item.routes) {
      findPathname(item.routes, pathname);
    }
  });
  return name;
};

/**
 * 手机格式校验
 * @param value 需校验的值
 */
const validatePhoneFormat = (value: string) => {
  const telReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  return telReg.test(value);
};

/**
 * 身份张号码校验（15/18）
 * 校验规则地址：https://segmentfault.com/a/1190000016696368
 * @param value 需校验的值
 */
const validateIDNumberFormat = (value: string) => {
  const IDNumberReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  return IDNumberReg.test(value);
};

/**
 * 密码的校验（6-12位，包含数字和字母）
 * @param value 需校验的值
 */
const validatePasswordFormat = (value: string) => {
  const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
  return passwordReg.test(value);
};

export {
  findPathname,
  validatePhoneFormat,
  validateIDNumberFormat,
  validatePasswordFormat,
};
