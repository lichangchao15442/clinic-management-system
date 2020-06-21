const Service = require('egg').Service;
class CommonService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }

  async getNumber() {
    const ctx = this.ctx;
    const { name } = ctx.query;
    let allData:{[key: string]:any}[] = []
    switch (name) {
      case 'department':
        allData = await ctx.model.Departments.findAll({
          order:[['number','DESC']]
        })
        break;
    
      case 'employee':
        allData = await ctx.model.Employees.findAll({
          order:[['number','DESC']]
        })
        break;
    
      case 'checkProject':
        allData = await ctx.model.CheckProjects.findAll({
          order:[['number','DESC']]
        })
        break;
    
      default:
        break;
    }
    const number = allData.length ? allData[0].number + 1 : 1000
    return number
  }
}
module.exports = CommonService;