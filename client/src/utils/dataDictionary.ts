// 接诊状态
const ADMISSION_STATUSES = [
  {
    label: '待接诊',
    value: 1,
    color: '#FF6262',
  },
  {
    label: '接诊中',
    value: 2,
    color: '#28D094',
  },
  {
    label: '已完成',
    value: 3,
    color: '#CCCCCC',
  },
];

// 科室
const DEPARTMENTS = [
  {
    label: ' 全科',
    value: 1,
  },
  {
    label: '儿科',
    value: 2,
  },
  {
    label: '骨科',
    value: 3,
  },
];

// 性别
const GENDERS = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];

// VIP等级
const VIPLEVELS = [
  {
    label: '非会员',
    value: 0,
  },
  {
    label: 'VIP1',
    value: 1,
  },
  {
    label: 'VIP2',
    value: 2,
  },
  {
    label: 'VIP3',
    value: 3,
  },
  {
    label: 'VIP4',
    value: 4,
  },
  {
    label: 'VIP5',
    value: 5,
  },
  {
    label: 'VIP6',
    value: 6,
  },
  {
    label: 'VIP7',
    value: 7,
  },
];

// 订单类型
const ORDER_STATUSES = [
  {
    label: '处方开立',
    value: 1,
  },
  {
    label: '药品零售',
    value: 2,
  },
];

// 收费状态
const CHARGE_STATUSES = [
  {
    label: '待收费',
    value: 1,
    color: '#28D094',
  },
  {
    label: '已收费',
    value: 2,
    color: '#FFC71C',
  },
  {
    label: '已退费',
    value: 3,
    color: '#999999',
  },
];

// 支付方式
const PAYMENT_METHODS = [
  {
    label: '支付宝',
    value: 1,
  },
  {
    label: '微信',
    value: 2,
  },
  {
    label: '现金',
    value: 3,
  },
];

//数据字典维护中的数据字典类型
const DICTIONARY_TYPES = [
  {
    label: '病历信息',
    value: 1,
    subTypes: [
      {
        label: '诊断信息',
        value: 1,
      },
      {
        label: '医嘱信息',
        value: 2,
      },
      {
        label: '主诉信息',
        value: 3,
      },
      {
        label: '现病史',
        value: 4,
      },
      {
        label: '既往史',
        value: 5,
      },
      {
        label: '过敏史',
        value: 6,
      },
      {
        label: '个人史',
        value: 7,
      },
      {
        label: '辅助检查',
        value: 8,
      },
      {
        label: '治疗意见',
        value: 9,
      },
    ],
  },
  {
    label: '药品信息',
    value: 2,
    subTypes: [
      {
        label: '药品分类',
        value: 1,
      },
      {
        label: '药品用法',
        value: 2,
      },
      {
        label: '药品剂型',
        value: 3,
      },
      {
        label: '发票项目',
        value: 4,
      },
      {
        label: '生产厂家',
        value: 5,
      },
      {
        label: '包装单位',
        value: 6,
      },
      {
        label: '入库类型',
        value: 7,
      },
      {
        label: '出库类型',
        value: 8,
      },
    ],
  },
  {
    label: '检查项目',
    value: 3,
    subTypes: [
      {
        label: '项目分类',
        value: 1,
      },
      {
        label: '项目单位',
        value: 2,
      },
    ],
  },
  {
    label: '患者信息',
    value: 4,
    subTypes: [
      {
        label: '患者来源',
        value: 1,
      },
      {
        label: '患者学历',
        value: 2,
      },
      {
        label: '患者职业',
        value: 3,
      },
    ],
  },
];

// 主诉分类
const CHIEF_COMPLAINT_TYPES = [
  {
    label: '常用症状',
    value: 1,
  },
  {
    label: '常用时间',
    value: 2,
  },
  {
    label: '常用标点',
    value: 3,
  },
  {
    label: '常用词汇',
    value: 4,
  },
];

// 处方类别
const PRESCRIPTION_TYPES = [
  {
    label: '西/成药处方',
    value: 1,
  },
  {
    label: '中药处方',
    value: 2,
  },
];

// 状态
const USE_STATUSES = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 0,
  },
];

// 年龄单位
const AGE_UNITS = [
  {
    label: '岁',
    value: 1,
  },
  {
    label: '月',
    value: 2,
  },
  {
    label: '天',
    value: 3,
  },
];

export {
  ADMISSION_STATUSES,
  DEPARTMENTS,
  GENDERS,
  VIPLEVELS,
  ORDER_STATUSES,
  CHARGE_STATUSES,
  PAYMENT_METHODS,
  DICTIONARY_TYPES,
  CHIEF_COMPLAINT_TYPES,
  PRESCRIPTION_TYPES,
  USE_STATUSES,
  AGE_UNITS
};
