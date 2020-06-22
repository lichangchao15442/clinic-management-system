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

class PatientsController extends Controller {
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
          if (key === 'department') {
            where.department = requestQuery[key]
          }
          if (key === 'search') {
            where[Op.or] = [
              {
                name: {
                  [Op.like]:'%' + requestQuery[key].trim() + '%'
                },
              },
            ]
          }
        }}
    })
    console.log('where',where)
    const query = { limit: toInt(pageSize), offset: (toInt(pageNum)-1)*toInt(pageSize),where };
    // 所有的患者数据
    const allData = await ctx.model.Departments.findAll({where});
    // 按条件查询患者
    const data = await ctx.model.Departments.findAll(query);
    ctx.body = {
      code: '1',
      data:{
        list: data,
        total:allData.length
      }
    }
  }

  async getAllDepartmentList() {
    const ctx = this.ctx
    const data = await ctx.model.Departments.findAll()
    ctx.body = {
      code: '1',
      data
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name } = ctx.request.body;
    // 名称去重
    const hasName = await ctx.model.Departments.findAll({
      where: {
        name
      }
    })
    if (hasName.length) {
    return ctx.body = {
        code: '0',
        msg: '科室名称已存在！'
      }
    }
    await ctx.model.Departments.create(ctx.request.body);
    ctx.body = {
      code: '1',
      msg: '操作成功'
    }
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

module.exports = PatientsController;