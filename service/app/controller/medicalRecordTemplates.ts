const Controller = require('egg').Controller;

class MedicalRecordTemplatesController extends Controller { 
  async create() {
    const ctx = this.ctx;
    const data = {
      ...ctx.request.body,
      createdTime: new Date()
    };
    await ctx.model.MedicalRecordTemplates.create(data)
    ctx.body = {
      code: '1',
      msg: '操作成功'
    }
  }
};


export { };

module.exports = MedicalRecordTemplatesController;