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

class SuppliersController extends Controller {
  // 供应商列表查询
  async index() {
    const ctx = this.ctx;
    console.log('ctx.query', ctx.query)
    const { pageNum = 1, pageSize = 9} = ctx.query
    const requestQuery = JSON.parse(ctx.query.query)
    let where: any = {}
    Object.keys(requestQuery).map(key => {
      if (requestQuery.hasOwnProperty(key)) {
        if (hasValue(requestQuery[key])) {
          if (key === 'search') {
            where[Op.or] = [
              {
                name: {
                  [Op.like]:'%' + requestQuery[key].trim() +'%'
                },
              }
            ]
          }
        }}
    })
    console.log('where',where)
    const query = { limit: toInt(pageSize), offset: (toInt(pageNum)-1)*toInt(pageSize),where };
    // 所有的患者数据
    const allData = await ctx.model.Suppliers.findAll({where});
    // 按条件查询患者
    const data = await ctx.model.Suppliers.findAll(query);
    ctx.body = {
      code: '1',
      data:{
        list: data,
        total:allData.length
      }
    }
  }

  // 获取最新的供应商编号
  async getSupplierNumber() {
    const ctx = this.ctx
    const allData = await ctx.model.Suppliers.findAll({
      'order':[['number','DESC']]
    })
    const supplierNumber = allData.length ? allData[0].number + 1 : 1000
    ctx.status = 200
    ctx.body = {
      code: '1',
      data: supplierNumber
    }
  }

  // 获取供应商详情
  async getSupplierDetail() {
    const ctx = this.ctx
    const id = toInt(ctx.query.id)
    const supplier = await ctx.model.Suppliers.findByPk(id)
    if (!supplier) {
      ctx.status = 200
      ctx.body = {
        code: '0',
        msg: '该供应商不存在'
      }
      return;
    }
    ctx.status = 200
    ctx.body = {
      code: '1',
      data: supplier
    }
  }

  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  // }

  // 新增供应商
  async create() {
    const ctx = this.ctx;
    const data = {
      ...ctx.request.body,
      createdTime:new Date()
    }
    await ctx.model.Suppliers.create(data);
    ctx.status = 201;
    ctx.body = {
      code: '1',
      msg:'操作成功'
    };
  }

  // 编辑供应商
  async update() {
    const ctx = this.ctx;
    const {id:supplierId,...others } = ctx.request.body;
    const id = toInt(supplierId);
    const supplier = await ctx.model.Suppliers.findByPk(id);
    if (!supplier) {
      ctx.status = 200;
      ctx.body = {
        code: '0',
        msg: '该供应商不存在'
      }
      return;
    }

    await supplier.update(others);
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }

  // 删除某个供应商
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const supplier = await ctx.model.Suppliers.findByPk(id);
    if (!supplier) {
      ctx.status = 200;
      ctx.body = {
        code: '0',
        msg: '该供应商不存在'
      }
      return;
    }

    await supplier.destroy();
    ctx.status = 200;
    ctx.body = {
      code: '1',
      msg: '操作成功'
    }
  }
}

export  {}

module.exports = SuppliersController;