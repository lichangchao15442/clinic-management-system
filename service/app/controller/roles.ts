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
    // TODO: 删除角色，先删除有该角色的用户中的该角色，再删除角色
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

module.exports = RolesController;