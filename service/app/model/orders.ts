'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Order = app.model.define('orders',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER, // 订单编号
    type: INTEGER, // 订单类型
    name: STRING(30),
    gender: INTEGER,
    age: INTEGER,
    phone: STRING(20),
    department: INTEGER,
    doctorName: {
      type: STRING(30),
      field: "doctor_name"
    },
    createdTime: {
      type: DATE,
      field: "created_time"
    },
    amountReceivable: {
      // 应收金额
      type: INTEGER,
      field: "amount_receivable"
    },
    amountReceived: {
      // 实收金额
      type: INTEGER,
      field: "amount_received"
    },
    amountRefund: {
      // 退费金额
      type: INTEGER,
      field: "amount_refund"
    },
    chargeStatus: {
      type: INTEGER,
      field: "charge_status"
    },
    paymentMethod: {
      // 支付方式
      type: INTEGER,
      field: "payment_method"
    },
    refundMethod: {
      // 退费方式
      type: INTEGER,
      field: "refund_method"
    },
  },
  {
    timestamps: false, //去除createAt updateAt
    freezeTableName: true, //使用自定义表名
    // 实例对应的表名
    tableName: "orders",
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: "created_at",
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: "updated_at",
    //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false, //'deleted_at',
    //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    paranoid: false
  });

  return Order;
};