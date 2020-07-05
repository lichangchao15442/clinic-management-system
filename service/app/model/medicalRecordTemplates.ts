'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const MedicalRecordTemplates = app.model.define('medical_record_templates',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: {
      type: STRING(30),
      content: "模版编号"
    },
    name: {
      type: STRING(30),
      content: "模版名称"
    },
    type: {
      type: INTEGER,
      content: "模版类型：1:西药病历，2:重要病历"
    },
    authority: {
      type: INTEGER,
      content: "模版权限：1:私人模版，2:公共模版"
    },
    description: {
      type: STRING(200),
      content: "模版说明"
    },
    creator: {
      type: STRING(30),
      content: "创建人员"
    },
    createdTime: {
      type: DATE,
      field: "create_time",
      content: "创建时间"
    },
    diagnosis: {
      type: STRING(255),
      content: "诊断"
    },
    chiefComplaint: {
      type: STRING(255),
      field:"chief_complaint",
      content: "主诉"
    },
    currentMedicalHistory: {
      type: INTEGER,
      field:"current_medical_history",
      content: "现病史"
    },
    pastHistory: {
      type: INTEGER,
      field:"past_history",
      content: "既往史"
    },
    allergyHistory: {
      type: INTEGER,
      field:"allergy_history",
      content: "过敏史"
    },
    personalHistory: {
      type: INTEGER,
      field:"personal_history",
      content: "个人史"
    },
    familyHistory: {
      type: INTEGER,
      field:"family_history",
      content: "家族史"
    },
    auxiliaryExamination: {
      type: INTEGER,
      field:"auxiliary_examination",
      content: "辅助检查"
    },
    treatmentAdvice: {
      type: INTEGER,
      field:"treatment_advice",
      content: "治疗意见"
    },
    medicalAdvice: {
      type: STRING(255),
      field:"medical_advice",
      content: "医嘱"
    },
    note: {
      type: STRING(255),
      content: "备注"
    },
  },
  {
    timestamps: false, //去除createAt updateAt
    freezeTableName: true, //使用自定义表名
    // 实例对应的表名
    tableName: "medical_record_templates",
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
  return MedicalRecordTemplates;
};