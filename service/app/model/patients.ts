'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Patients = app.model.define('patients', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    avatar: STRING(200),
    name: STRING(30),
    vipLevel: {
      type: INTEGER,
      field:'vip_level'
    },
    gender: INTEGER,
    age: INTEGER,
    admissionStatus: {
      type: INTEGER,
      field:'admission_status'
    },
    createdTime: {
      type: DATE,
      field:'created_time'
    },
    department: INTEGER,
    doctorName: {
      type: STRING(30),
      field:'doctor_name'
    },
    phone:STRING(20),
  },{
    timestamps: false,  //去除createAt updateAt
    freezeTableName: true,  //使用自定义表名
    // 实例对应的表名
    tableName: 'patients',
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
    //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false, //'deleted_at',
    //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    paranoid: false
  })
  return Patients;
};