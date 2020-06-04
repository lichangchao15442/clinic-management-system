'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING, BOOLEAN, DECIMAL } = app.Sequelize;

  const CheckProjects = app.model.define('checkProjects', 
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER,
    name: STRING(30),
    type: STRING(30), // 项目类型
    invoiceItems: {
      // 发票项目
      type: STRING(30),
      field: "invoice_items"
    },
    retailPrice: {
      // 零售价
      type: DECIMAL(2),
      field: "retail_price"
    },
    costPrice: {
      // 成本价
      type: DECIMAL(2),
      field: "cost_price"
    },
    unit: STRING(10),
    status: INTEGER,
    createdTime: {
      type: DATE,
      field: "created_time"
    },
    part: STRING(30), // 部位
    isAllowMemberDiscount: {
      // 是否允许会员折扣
      type: BOOLEAN,
      field: "is_allow_member_discount"
    },
    note: STRING(200)
  },
  {
    timestamps: false, //去除createAt updateAt
    freezeTableName: true, //使用自定义表名
    // 实例对应的表名
    tableName: "checkProjects",
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: "created_at",
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: "updated_at",
    //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false, //'deleted_at',
    //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    paranoid: false
  })
  return CheckProjects;
};