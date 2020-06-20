'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Employees = app.model.define('employees', 
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER, // 工号/编号
    name: STRING(30),
    gender: INTEGER,
    age: INTEGER,
    ageUnit: { // 年龄单位
      type: INTEGER,
      field: 'age_unit'
    },
    phone: STRING(20),
    email:STRING(30),
    idNumber: {
      // 证件号码
      type: STRING(20),
      field: "id_number"
    },
    jobTitle: {
      // 职位名称
      type: STRING(20),
      field: "job_title"
    },
    address: STRING,
    addressDetail: {
      type: STRING(100),
      field:'address_detail'
    },
    ownClinic: {
      // 所属诊所
      type: STRING(30),
      field: "own_clinic"
    },
    department: STRING(30),
    role: STRING(255),
    password:STRING(30),
    createdTime: {
      type: DATE,
      field: "created_time"
    },
    creator: STRING(30),
    status: INTEGER
  },
  {
    timestamps: false, //去除createAt updateAt
    freezeTableName: true, //使用自定义表名
    // 实例对应的表名
    tableName: "employees",
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
  return Employees;
};