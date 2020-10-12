
import React, { ReactNode } from 'react'
import { Select, Input } from 'antd'

import { CHIEF_COMPLAINT_TYPES, PRESCRIPTION_TYPES } from '@/utils/dataDictionary';
import { ITableColumn } from '@/components/GlobalTable/data.d';
import { AnyObject } from 'typings';


const { Option } = Select
const { TextArea } = Input

export interface OwnParamType {
  /** 一级类型 */
  dictionaryType: number;
  /** 二级类型 */
  subDictionaryType: number;
  /** 自己独有的列配置 */
  columns: ITableColumn<AnyObject>[];
  /** 新增modaltitle */
  modalTitel: string;
  /** 新增modal字段配置集合 */
  modalFormItems: {
    label: string;
    name: string;
    component: ReactNode;
  }[];
}

const ownParams: OwnParamType[] = [
  {
    dictionaryType: 1,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'name',
        title: '诊断内容',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '模版内容' }
      }
    ],
    // searchPlaceholder: '模版内容',
    modalTitel: '诊断信息',
    modalFormItems: [
      {
        label: '诊断信息',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'name',
        title: '医嘱内容',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '模版内容' }
      }
    ],
    // searchPlaceholder: '模版内容',
    modalTitel: '医嘱信息',
    modalFormItems: [
      {
        label: '医嘱信息',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 3,
    columns: [
      {
        dataIndex: 'type',
        title: '分类',
        align: 'center',
        render: (type: number) => <span>{CHIEF_COMPLAINT_TYPES.find(item => item.value === type)?.label}</span>,
        searchType: 'select',
        searchEnum: CHIEF_COMPLAINT_TYPES,
        formItemWidgetProps: { label: '主诉分类' }
      },
      {
        dataIndex: 'name',
        title: '主诉内容',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '主诉内容' }
      },
    ],
    // searchPlaceholder: '主诉内容',
    // filterFormItems: [
    //   {
    //     label: '主诉分类',
    //     name: 'type',
    //     component: <Select style={{ width: 100 }} allowClear={true} placeholder="请选择">
    //       {CHIEF_COMPLAINT_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
    //     </Select>
    //   }
    // ],
    modalTitel: '主诉信息',
    modalFormItems: [
      {
        label: '主诉类型',
        name: 'type',
        component: <Select style={{ width: 100 }} allowClear={true} placeholder="请选择">
          {CHIEF_COMPLAINT_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
      },
      {
        label: '主诉信息',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 4,
    columns: [
      {
        dataIndex: 'name',
        title: '现病史',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '内容' }
      }
    ],
    // searchPlaceholder: '内容',
    modalTitel: '现病史',
    modalFormItems: [
      {
        label: '现病史内容',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 5,
    columns: [
      {
        dataIndex: 'name',
        title: '既往史',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '内容' }
      }
    ],
    // searchPlaceholder: '内容',
    modalTitel: '既往史',
    modalFormItems: [
      {
        label: '既往史内容',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 6,
    columns: [
      {
        dataIndex: 'name',
        title: '过敏史',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '内容' }
      }
    ],
    // searchPlaceholder: '内容',
    modalTitel: '过敏史',
    modalFormItems: [
      {
        label: '过敏史内容',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 7,
    columns: [
      {
        dataIndex: 'name',
        title: '个人史',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '内容' }
      }
    ],
    // searchPlaceholder: '内容',
    modalTitel: '个人史',
    modalFormItems: [
      {
        label: '个人史内容',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 8,
    columns: [
      {
        dataIndex: 'name',
        title: '辅助检查情况',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '内容' }
      }
    ],
    // searchPlaceholder: '内容',
    modalTitel: '辅助检查情况',
    modalFormItems: [
      {
        label: '辅助检查内容',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 1,
    subDictionaryType: 9,
    columns: [
      {
        dataIndex: 'name',
        title: '治疗意见',
        align: 'center',
        searchType: 'input',
        formItemWidgetProps: { placeholder: '内容' }
      }
    ],
    // searchPlaceholder: '内容',
    modalTitel: '治疗意见',
    modalFormItems: [
      {
        label: '治疗意见',
        name: 'name',
        component: <TextArea rows={4} />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'type',
        title: '处方分类',
        align: 'center',
        render: (type: number) => <span>{PRESCRIPTION_TYPES.find(item => item.value === type)?.label}</span>,
        searchType: 'select',
        searchEnum: PRESCRIPTION_TYPES
      },
      {
        dataIndex: 'name',
        title: '分类名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '分类名称',
    // filterFormItems: [
    //   {
    //     label: '处方类别',
    //     name: 'type',
    //     component: <Select style={{ width: 120 }} allowClear={true} placeholder="请选择">
    //       {PRESCRIPTION_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
    //     </Select>
    //   }
    // ],
    modalTitel: '药品分类',
    modalFormItems: [
      {
        label: '处方类型',
        name: 'type',
        component: <Select style={{ width: 120 }} allowClear={true} placeholder="请选择">
          {PRESCRIPTION_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
      },
      {
        label: '分类名称',
        name: 'name',
        component: <Input placeholder="请输入分类名称，限20个字符" maxLength={20} />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'type',
        title: '处方分类',
        align: 'center',
        render: (type: number) => <span>{PRESCRIPTION_TYPES.find(item => item.value === type)?.label}</span>,
        searchType: 'select',
        searchEnum: PRESCRIPTION_TYPES
      },
      {
        dataIndex: 'name',
        title: '用法名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '用法名称',
    // filterFormItems: [
    //   {
    //     label: '处方类别',
    //     name: 'type',
    //     component: <Select style={{ width: 120 }} allowClear={true} placeholder="请选择">
    //       {PRESCRIPTION_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
    //     </Select>
    //   }
    // ],
    modalTitel: '药品用法',
    modalFormItems: [
      {
        label: '处方类型',
        name: 'type',
        component: <Select style={{ width: 120 }} allowClear={true} placeholder="请选择">
          {PRESCRIPTION_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
      },
      {
        label: '用法名称',
        name: 'name',
        component: <Input placeholder="请输入用法名称，限20个字符" maxLength={20} />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 3,
    columns: [
      {
        dataIndex: 'name',
        title: '剂型名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '剂型名称',
    modalTitel: '药品剂型',
    modalFormItems: [
      {
        label: '剂型名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 4,
    columns: [
      {
        dataIndex: 'name',
        title: '项目名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '项目名称',
    modalTitel: '发票项目',
    modalFormItems: [
      {
        label: '项目名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 5,
    columns: [
      {
        dataIndex: 'name',
        title: '厂家名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '厂家名称',
    modalTitel: '生产厂家',
    modalFormItems: [
      {
        label: '厂家名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 6,
    columns: [
      {
        dataIndex: 'name',
        title: '单位名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '单位名称',
    modalTitel: '包装单位',
    modalFormItems: [
      {
        label: '单位名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 7,
    columns: [
      {
        dataIndex: 'name',
        title: '入库类型',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '入库类型',
    modalTitel: '入库类型',
    modalFormItems: [
      {
        label: '入库类型',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 2,
    subDictionaryType: 8,
    columns: [
      {
        dataIndex: 'name',
        title: '出库类型',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '出库类型',
    modalTitel: '出库类型',
    modalFormItems: [
      {
        label: '出库类型',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 3,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'name',
        title: '分类名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '分类名称',
    modalTitel: '项目分类',
    modalFormItems: [
      {
        label: '分类名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 3,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'name',
        title: '单位名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '单位名称',
    modalTitel: '项目单位',
    modalFormItems: [
      {
        label: '单位名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 4,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'name',
        title: '来源名称',
        align: 'center',
        searchType: 'input',
      }
    ],
    // searchPlaceholder: '来源名称',
    modalTitel: '来源',
    modalFormItems: [
      {
        label: '来源名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 4,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'name',
        title: '学历名称',
        align: 'center',
        searchType: 'input'
      }
    ],
    // searchPlaceholder: '学历名称',
    modalTitel: '学历',
    modalFormItems: [
      {
        label: '学历名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
  {
    dictionaryType: 4,
    subDictionaryType: 3,
    columns: [
      {
        dataIndex: 'name',
        title: '职业名称',
        align: 'center',
        searchType: 'input'
      }
    ],
    // searchPlaceholder: '职业名称',
    modalTitel: '职业',
    modalFormItems: [
      {
        label: '职业名称',
        name: 'name',
        component: <Input />
      }
    ]
  },
]

export { ownParams }