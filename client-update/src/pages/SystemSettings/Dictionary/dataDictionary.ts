
/** 数据字典维护中的数据字典类型 */
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

export {
  DICTIONARY_TYPES,
};
