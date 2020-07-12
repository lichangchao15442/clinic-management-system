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
    let initValue :number | string= 1000
    let modelName = ''
    switch (name) {
      case 'department':
        modelName = 'Departments'
        break;
    
      case 'employee':
        modelName = 'Employees'
        break;
    
      case 'checkProject':
        modelName = 'CheckProjects'
        break;
    
      case 'role':
        modelName = 'Roles'
        break;
    
      case 'medicalRecordTemplate':
        modelName = 'MedicalRecordTemplates'
        initValue = 'RZ00001'
        break;
    
      default:
        break;
    }
    const allData = modelName && await ctx.model[modelName].findAll({
      order:[['number','DESC']]
    })
    let number;
    if (name === 'medicalRecordTemplate') {
      const num = Number(allData[0].number.split('RZ')[1]) + 1;
      number = allData.length ? 'RZ' + num.toString().padStart(5, '0') : initValue;
    } else {
      number = allData.length ? allData[0].number + 1 : initValue
    }
    return number
  }
}
module.exports = CommonService;