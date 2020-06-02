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
    value:1
  },
  {
    label: '微信',
    value:2
  },
  {
    label: '现金',
    value:3
  },
]

export {
  ADMISSION_STATUSES,
  DEPARTMENTS,
  GENDERS,
  VIPLEVELS,
  ORDER_STATUSES,
  CHARGE_STATUSES,
  PAYMENT_METHODS
};
