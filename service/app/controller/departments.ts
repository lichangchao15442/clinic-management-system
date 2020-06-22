const Controller = require('egg').Controller;

import {toInt, hasValue} from '../service/utils'

const Op = require('sequelize').Op

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
    const data = await ctx.model.Departments.findByPk(toInt(ctx.query.id));
    if (!data) {
      return ctx.body = {
        code: '0',
        msg: '该科室不存在'
      }
    }
    ctx.body = {
      code: '1',
      data
    }
  }

  async create() {
    const ctx = this.ctx;
    const { name } = ctx.request.body;
    // 名称去重
    const hasName = await ctx.model.Departments.findAll({
      where: {
        name
      }
    });
    if (hasName.length) {
      ctx.body = {
        code: '0',
        msg: '科室名称已存在！'
      };
      return;
    }
    await ctx.model.Departments.create(ctx.request.body);
    ctx.body = {
      code: '1',
      msg: '操作成功'
    }
  }

  async update() {
    const ctx = this.ctx;
    const {id, ...others} = ctx.request.body;
    const department = await ctx.model.Departments.findByPk(toInt(id));
    if (!department) {
      ctx.body = {
        code: '0',
        msg: '该科室不存在！'
      }
    }
    // 名称去重
    if (others.name) {
      const hasNames = others.name !== department.name && await ctx.model.Departments.findAll({
        where: {
          name: others.name
        }
      });
      if (hasNames) {
        ctx.body = {
          code: '0',
          msg: '该科室名称已存在'
        };
        return;
      };
    }

    await department.update(others);
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const department = await ctx.model.Departments.findByPk(id);
    if (!department) {
      ctx.body = {
        code: '0',
        msg: '该科室不存在'
      };
      return;
    };

    await department.destroy();
    ctx.body = {
      code: '1',
      msg: '操作成功'
    };
  }
}

export {}

module.exports = PatientsController;