import { AnyObject } from 'typings';
import XLSX from 'xlsx';
import { ColumnType } from 'antd/lib/table/interface';
import { message } from 'antd';

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

/**
 * 判断x是否存在（null和undefined为不存在）
 * @param x
 */
const existy = (x: any) => x != null;

/**
 * 对某个对象的某些字段进行统一trim处理
 * @param trimArray 需要trim的字段集合
 * @param values 某些字段需要trim处理的对象
 */
const handleTrim = (trimArray: string[] = [], values: AnyObject = {}) => {
  const trimObj: AnyObject = {};
  trimArray.forEach(item => {
    if (values[item]) {
      trimObj[item] = values[item].trim();
    }
  });
  return {
    ...values,
    ...trimObj,
  };
};

/**
 * 将dataSource转为导出格式
 * @param data 导出数据集合
 * @param columns 列配置集合
 */
const formatDownloadData = (
  data: AnyObject[],
  columns: ColumnType<AnyObject>[],
) => {
  const json = data.map((item: any) => {
    return columns.reduce((newData: any, columnItem: any) => {
      const title = columnItem?.title;
      if (
        title &&
        (item[columnItem.dataIndex] || item[columnItem.dataIndex] === 0)
      ) {
        newData[title] = item[columnItem.dataIndex];
      }
      return newData;
    }, {});
  });
  return json;
};

/**
 * 字符串转ArrayBuffer
 * @param str 字符串
 */
const stringToArrayBuffer = (str: string) => {
  const buf = new ArrayBuffer(str.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i != str.length; ++i) view[i] = str.charCodeAt(i) & 0xff;
  return buf;
};

/**
 * sheet格式转为blob格式
 * @param sheet
 * @param sheetName
 */
const sheetToBlob = (sheet: any, sheetName?: string) => {
  sheetName = sheetName || 'sheet1';
  const workbook = {
    SheetNames: [sheetName], // 保存的表标题
    Sheets: {
      [sheetName]: sheet, // 生成Excel的配置项
    },
  };
  const wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table
    type: 'binary',
  };
  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([stringToArrayBuffer(wbout)], {
    type: 'application/octet-stream',
  });
  return blob;
};

/**
 * 导出文件
 * @param json 导出数据集合
 * @param fileName  文件名前缀
 */
const download = (
  data: AnyObject[],
  columns: ColumnType<AnyObject>[],
  fileName: string,
) => {
  const json = formatDownloadData(data, columns);
  if (!json.length) {
    message.warning('暂无导出数据');
    return;
  }
  const sheet = XLSX.utils.json_to_sheet(json);
  const blob = sheetToBlob(sheet, undefined);
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = fileName;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/** 获取登录系统的用户名 */
const getLoginUserName = () => {
  // TODO: 获取存在本地的登录用户信息
  return '顾兰兰';
};

export {
  findPathname,
  validatePhoneFormat,
  validateIDNumberFormat,
  validatePasswordFormat,
  existy,
  handleTrim,
  download,
  getLoginUserName,
};
