
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

/** 订单类型 */
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

/** 收费状态 */
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

/** 支付方式 */
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

export {
  DEPARTMENTS,
  ORDER_STATUSES,
  CHARGE_STATUSES,
  PAYMENT_METHODS,
};
