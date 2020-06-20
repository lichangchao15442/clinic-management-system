const Controller = require('egg').Controller;
const _ = require('lodash')

import { hasValue } from '../service/utils'

const Op = require('sequelize').Op

const  toInt = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
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
    let allEmployees = await ctx.model.Employees.findAll(query);

    const data = await  Promise.all(allEmployees.map( async item => {
      let roleNames: string[] = []
      const roles = item.role.split(' ')
      for (let j = 0; j < roles.length; j++) {
        const role = await ctx.model.Roles.findByPk(toInt(roles[j]))
        roleNames.push(role.name)
      }
      // 注意：使用解构会报错
      let newItem = _.cloneDeep(item)
      newItem.role = roleNames.join(' ')
      return newItem
    }))

    
    ctx.body = {
      code: '1',
      data:{
        list:  data,
        total: allData.length
      }
    }
  }

  // 获取最新的员工编号，再+1
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

  // 获取员工详情
  async show() {
    const ctx = this.ctx;
    const emplyoee = await ctx.model.Employees.findByPk(toInt(ctx.query.id));
    if (!emplyoee) {
      ctx.body = {
        code: '0',
        msg: '该员工不存在'
      }
      return 
    }
    ctx.body = {
      code: '1',
      data:emplyoee
    }
  }

  async create() {
    const ctx = this.ctx;
    const data = {
      ...ctx.request.body,
      createdTime: new Date()
    }
    await ctx.model.Employees.create(data);
    ctx.status = 201;
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }

  async update() {
    const ctx = this.ctx;
    const { id: emplyoeeId, ...others } = ctx.request.body;

    const id = toInt(emplyoeeId);
    const emplyoee = await ctx.model.Employees.findByPk(id);
    if (!emplyoee) {
      ctx.body = {
        code: '0',
        msg: '该员工不存在'
      };
      return;
    }

    await emplyoee.update(others);
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

module.exports = EmployeesController;