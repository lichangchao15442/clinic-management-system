const Controller = require('egg').Controller;


class MedicalRecordTemplatesController extends Controller { 
  /** 新增病历模板 */
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

  /** 病历模版列表 */
  async index() {
    const ctx = this.ctx;
    const data = await ctx.service.medicalRecordTemplates.getMedicalRecordTemplateList(ctx.query);
    ctx.body = {
      code: '1',
      data: {
        list: data.list,
        total: data.total
      }
    }
  }
};


export { };

module.exports = MedicalRecordTemplatesController;