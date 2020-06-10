const Controller = require('egg').Controller;

const Op = require('sequelize').Op

const  toInt = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

// 判断某个属性是否有值（为undefined、null、‘’)
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

class EmployeesController extends Controller {
  // 查询员工列表
  async index() {
    const ctx = this.ctx;
    console.log('ctx.query', ctx.query)
    const { pageNum = 1, pageSize = 9} = ctx.query
    const requestQuery = JSON.parse(ctx.query.query)
    let where: any = {}
    Object.keys(requestQuery).map(key => {
      if (requestQuery.hasOwnProperty(key)) {
      // console.log('requestQuery', requestQuery,key)
        if (hasValue(requestQuery[key])) {
          // if (key === 'createdTime') {
          //   where.createdTime = {
          //     [Op.between]:requestQuery[key]
          //   }
          // }
          // if (key === 'admissionStatus') {
          //   where.admissionStatus = requestQuery[key]
          // }
          // if (key === 'vipLevel') {
          //   where.vipLevel = requestQuery[key]
          // }
          if (key === 'search') {
            where[Op.or] = [
              {
                name: requestQuery[key].trim(),
              }
            ]
          }
        }}
    })
    console.log('where',where)
    const query = { limit: toInt(pageSize), offset: (toInt(pageNum)-1)*toInt(pageSize),where };
    // 所有的患者数据
    const allData = await ctx.model.Employees.findAll({where});
    // 按条件查询患者
    const data = await ctx.model.Employees.findAll(query);
    ctx.body = {
      code: '1',
      data:{
        list: data,
        total:allData.length
      }
    }
  }

  async getInitEmployeeNumber() {
    const ctx = this.ctx;
    const allData = await ctx.model.Employees.findAll({
      'order': [
        ['number', 'DESC']
      ]
    })
    const number = allData.length ? allData[0].number + 1 : 1000
    ctx.body = {
      code: '1',
      data:number
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

export {}

module.exports = EmployeesController;