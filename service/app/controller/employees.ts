const Controller = require('egg').Controller;
const _ = require('lodash')

import { hasValue, toInt } from '../service/utils'

const Op = require('sequelize').Op

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
      console.log('requestQuery', requestQuery,key)
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

    const data = await Promise.all(allEmployees.map(async item => {
      // 根据角色ID查询对应的角色名
      let roleNames: string[] = []
      if (item.role) {
        const roles = item.role.split(' ')
        for (let j = 0; j < roles.length; j++) {
          const role = await ctx.model.Roles.findByPk(toInt(roles[j]))
          role && roleNames.push(role.name)
        }
      }
      // 根据部门ID查询对应的部门名
      const departmentData = item.department ? await ctx.model.Departments.findByPk(item.department) : {};
      // 注意：使用解构会报错
      let newItem = _.cloneDeep(item);
      newItem.role = roleNames.join(' ');
      newItem.department = departmentData.name;
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
    const id = toInt(ctx.request.body.id);
    const employee = await ctx.model.Employees.findByPk(id);
    if (!employee) {
      ctx.body = {
        code: '0',
        msg: '该用户不存在'
      }
      return;
    }

    await employee.destroy();
    ctx.body = {
      code: '1',
      msg: '操作成功'
    }
  }
}

export {}

module.exports = EmployeesController;