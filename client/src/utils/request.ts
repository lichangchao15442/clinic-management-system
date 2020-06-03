/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response || {};
};

/**
 * 处理响应/请求入参数据，删除返回值为null的数据，避免结构赋值出现问题
 * @param response
 */
const handleResponseData = (response: object) => {
  if (!response || typeof response !== 'object') {
    return {};
  }
  // JSON.stringify(response) 可直接删除属性值为undefined的属性
  const data = JSON.parse(JSON.stringify(response), (k, v) => {
    if (v === null) {
      return undefined;
    }
    return v;
  });
  if (!data) {
    return {};
  }
  return data;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  // TODO: 处理为无值的参数
  let tempData;
  if (options.method === 'get') {
    tempData = options.params;
  } else {
    tempData = options.data;
  }
  return {
    url: `${API_BASE}${url}`,
    options: {
      ...options,
      ...handleResponseData(tempData), // 可过滤值为undefined/null的属性
    },
  };
});

// 克隆响应对象做解析处理
request.interceptors.response.use(async response => {
  const res = await response.clone().json();
  const { code = '', msg = '' } = res;
  if (code !== '1') {
    message.warning(msg);
  } else {
    return handleResponseData(res);
  }
  return response;
});

export default request;
