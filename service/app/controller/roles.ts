const Controller = require('egg').Controller;

import { toInt, hasValue } from '../service/utils'

const Op = require('sequelize').Op

class RolesController extends Controller {
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
    const allData = await ctx.model.Roles.findAll({where});
    // 按条件查询患者
    const data = await ctx.model.Roles.findAll(query);
    ctx.body = {
      code: '1',
      data:{
        list: data,
        total:allData.length
      }
    }
  }

  async getAllRoleList() {
    const ctx = this.ctx;
    const data = await ctx.model.Roles.findAll()
    ctx.body = {
      code: '1',
      data
    }
  }

  async show() {
    const ctx = this.ctx;
    const role = await ctx.model.Roles.findByPk(toInt(ctx.query.id));
    if (!role) {
      ctx.body = {
        code: '0',
        msg: '该角色不存在'
      };
      return;
    }
    ctx.body = {
      code: '1',
      data: role
    }
  }

  async create() {
    const ctx = this.ctx;
    // 角色名去重
    const { name } = ctx.request.body;
    const hasName = ctx.model.Roles.findAll({
      where: {
        name
      }
    });
    if (hasName.length) {
      ctx.body = {
        code: '0',
        msg: '该角色名已存在'
      };
      return;
    };

    await ctx.model.Roles.create({
      ...ctx.request.body,
      createdTime: new Date()
    });
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }

  async update() {
    const ctx = this.ctx;
    const {id, ...others } = ctx.request.body;
    // 判断该角色是否存在
    const role = await ctx.model.Roles.findByPk(toInt(id));
    if (!role) {
      ctx.body = {
        code: '0',
        msg: '该角色不存在'
      }
      return;
    }

    // 存在时，判断角色名是否重复（编辑可以与自己重复）
    if (others.name) {
      const hasName = role.name !== others.name && await ctx.model.Roles.findAll({
        where: {
          name: others.name
        }
      });
      if (hasName) {
        ctx.body = {
          code: '0',
          msg: '该角色名已存在'
        };
        return;
      }
    }
    await role.update(others);
    ctx.body = {
      code: '1',
      msg: '操作成功'
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const role = await ctx.model.Roles.findByPk(id);
    if (!role) {
      ctx.body = {
        code: '0',
        msg: '该角色不存在'
      };
      return;
    }

    // 先找到包含该角色的所有用户
    const includeRoleEmployees = await ctx.model.Employees.findAll({
      where: {
        role: {
          [Op.like]: '%' + id + '%'
        }
      }
    })
    // 删除这些用户中的该角色ID
    await Promise.all(includeRoleEmployees.map(async item => {
      const employee = await ctx.model.Employees.findByPk(toInt(item.id));
      const nowRoles = employee.role.split(' ').filter(role => toInt(role) !== id);
      await employee.update({ role: nowRoles.length ? nowRoles.join(' ') : null });
      return item;
    }))

    await role.destroy();
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }
}

export {}

module.exports = RolesController;