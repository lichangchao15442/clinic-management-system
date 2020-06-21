const Controller = require('egg').Controller;
class CommonController extends Controller {
  async getInitNumber() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const data = await service.common.getNumber();
    // 设置响应内容和响应状态码
    ctx.body = {
      code: '1',
      data
    }
  }
}
export {}
module.exports = CommonController;