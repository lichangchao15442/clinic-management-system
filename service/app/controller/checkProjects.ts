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
      console.log('requestQuery', requestQuery,key)
        if (hasValue(requestQuery[key])) {
          if (key === 'status') {
            where.status = requestQuery[key]
          }
          if (key === 'search') {
            where[Op.or] = [
              {
                name: requestQuery[key].trim(),
              },
              {
                number:requestQuery[key].trim()
              }
            ]
          }
        }}
    })
    console.log('where',where)
    const query = { limit: toInt(pageSize), offset: (toInt(pageNum)-1)*toInt(pageSize),where };
    // 所有的患者数据
    const allData = await ctx.model.CheckProjects.findAll({where});
    // 按条件查询患者
    const data = await ctx.model.CheckProjects.findAll(query);
    ctx.body = {
      code: '1',
      data:{
        list: data,
        total:allData.length
      }
    }
  }

  // 获取项目编码
  async getProjectNumber() { 
    const ctx = this.ctx
    const allData = await ctx.model.CheckProjects.findAll({
      order:[['number','DESC']],
    });
    ctx.status = 200;
    ctx.body = {
      code: '1',
      data:allData[0].number+1
    };
  }

  // 检查项目名是否已存在
  async isCheckProjectNameExited() {
    const ctx = this.ctx
    const {name,id=null} = ctx.query
    const allData = await ctx.model.CheckProjects.findAll()
    let isExited = allData.find(item => item.name === name)
    // 根据ID是否存在，判断是新增还是编辑
    if (id) { // 为编辑，编辑时需考虑本身的名字不是重复的情况
      const ownData = await ctx.model.CheckProjects.findByPk(id)
      if (ownData.name === name) {
        isExited = false
      }
    }
    ctx.status = 200;
    ctx.body = {
      code: '1',
      data:Boolean(isExited)
    };
  }
  
  // 获取检查项目详情
  async getCheckProjectDetail() {
    const ctx = this.ctx
    const { id } = ctx.query
    const data = await ctx.model.CheckProjects.findByPk(id)
    ctx.status = 200
    ctx.body = {
      code: '1',
      data
    }
  }

  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  // }

  async create() {
    const ctx = this.ctx;
    const data = {
      ...ctx.request.body,
      createdTime: new Date()
    }
    await ctx.model.CheckProjects.create(data);
    ctx.status = 201;
    ctx.body = {
      code: '1',
      msg:'操作成功'
    };
  }

  async update() {
    const ctx = this.ctx;
    const { id:checkProjectId,...others } = ctx.request.body;

    const id = toInt(checkProjectId);
    const checkProject = await ctx.model.CheckProjects.findByPk(id);
    if (!checkProject) {
      ctx.status = 200;
      ctx.body = {
        code: '0',
        msg:'该检查项目不存在'
      }
      return;
    }

    await checkProject.update(others);
    ctx.status = 200
    ctx.body = {
      code: '1',
      msg:'操作成功'
    };
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