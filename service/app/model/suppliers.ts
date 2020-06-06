'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Suppliers = app.model.define('suppliers', 
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER,
    name: STRING(30),
    contactPerson: {
      // 联系人
      type: STRING(30),
      field: "contact_person"
    },
    phone: STRING(20),
    createdTime: {
      type: DATE,
      field: "created_time"
    },
    creator: STRING(30),
    status: INTEGER,
    note:STRING(30)
  },
  {
    timestamps: false, //去除createAt updateAt
    freezeTableName: true, //使用自定义表名
    // 实例对应的表名
    tableName: "suppliers",
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
  return Suppliers;
};