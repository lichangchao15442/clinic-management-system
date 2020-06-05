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

class OrdersController extends Controller {

  // 查询字典表数据
  async index() {
    const ctx = this.ctx;
    console.log('ctx.query', ctx.query)
    const { pageNum = 1, pageSize = 10} = ctx.query
    const requestQuery = JSON.parse(ctx.query.query)
    let where: any = {}
    Object.keys(requestQuery).map(key => {
      if (requestQuery.hasOwnProperty(key)) {
        if (hasValue(requestQuery[key])) {
          console.log('requestQuery',requestQuery,key)
          // if (key === 'createdTime') {
          //   where.createdTime = {
          //     [Op.between]:requestQuery[key]
          //   }
          // }
          if (key === 'dictionaryType') {
            where.dictionaryType = requestQuery[key]
          }
          if (key === 'subDictionaryType') {
            where.subDictionaryType = requestQuery[key]
          }
          if (key === 'type') {
            where.type = requestQuery[key]
          }
          if (key === 'search') {
            where[Op.or] = [
              {
                name: requestQuery[key].trim(),
              }
            ]
          }
        }}
    })
    const query = {
      limit: toInt(pageSize),
      offset: (toInt(pageNum) - 1) * toInt(pageSize),
      order:[['createdTime','DESC']],
      where
    };
    // // 所有的患者数据
    const allData = await ctx.model.Dictionary.findAll({where});
    // // 按条件查询患者
    const data = await ctx.model.Dictionary.findAll(query);
    
    ctx.body = {
      code: '1',
      data:{
        list: data,
        total:allData.length
      }
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  // 创建字典表数据
  async create() {
    const ctx = this.ctx;
    const data = {
      ...ctx.request.body,
      createdTime:new Date()
    }
    // 名字去重
    const { name, dictionaryType, subDictionaryType } = ctx.request.body
    const where = {dictionaryType,subDictionaryType}
    const datas = await ctx.model.Dictionary.findAll({where})
    const allNames = datas.map(item => item.name)
    const isExtied = allNames.find(item => item === name)
    if (isExtied) {
      ctx.status = 200;
      ctx.body = {
        code: '0',
        msg:'名字已存在'
      }
      return;
    }
    await ctx.model.Dictionary.create(data);
    ctx.status = 201;
    ctx.body = {
      code: '1',
      msg:'操作成功'
    };
  }

  // 编辑字典表数据
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const user = await ctx.model.Dictionary.findByPk(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        code: '0',
        msg:'用户不存在'
      }
      return;
    }
    // 名字去重
    const { name, dictionaryType, subDictionaryType,type } = ctx.request.body
    const where = {dictionaryType,subDictionaryType}
    const datas = await ctx.model.Dictionary.findAll({where})
    const allNames = datas.map(item => item.name)
    const isExtied = allNames.find(item => item === name)
    if (isExtied) {
      ctx.status = 200;
      ctx.body = {
        code: '0',
        msg:'名字已存在'
      }
      return;
    }

    let updateData:{[key:string]:any} = { name }
    if (hasValue(type)) {
      updateData = {name,type}
    }
    await user.update(updateData);
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }

  // 删除字典表数据
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const user = await ctx.model.Dictionary.findByPk(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        code: '0',
        msg:'用户不存在'
      }
      return;
    }

    await user.destroy();
    ctx.status = 200;
    ctx.body = {
      code: '1',
      msg:'操作成功'
    }
  }

  // 查询项目单位列表
  async getUnitList() {
    const ctx = this.ctx;
    const unitList = await ctx.model.Dictionary.findAll({
      where: {
        dictionaryType: 3,
        subDictionaryType:2
      }
    });
    const data = unitList.map(item => item.name)
    ctx.status = 200;
    ctx.body = {
      code: '1',
      data
    }
    
  }

  // 查询项目分类列表
  async getProjectTypeList() {
    const ctx = this.ctx;
    const projectTypeList = await ctx.model.Dictionary.findAll({
      where: {
        dictionaryType: 3,
        subDictionaryType:1
      }
    });
    const data = projectTypeList.map(item => item.name)
    ctx.status = 200;
    ctx.body = {
      code: '1',
      data
    }
    
  }

  // 查询发票项目列表
  async getInvoiceItemList() {
    const ctx = this.ctx;
    const invoiceItemList = await ctx.model.Dictionary.findAll({
      where: {
        dictionaryType: 2,
        subDictionaryType:4
      }
    });
    const data = invoiceItemList.map(item => item.name)
    ctx.status = 200;
    ctx.body = {
      code: '1',
      data
    }
    
  }
}

export {}

module.exports = OrdersController;
