import React, { useState, useEffect } from 'react'
import { Radio, Select } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import _ from 'lodash'
import { connect } from 'umi'
import moment from 'moment'

import GlobalTable from '@/components/GlobalTable'
import { DICTIONARY_TYPES, CHIEF_COMPLAINT_TYPES, PRESCRIPTION_TYPES } from '@/utils/dataDictionary'
import { DictionaryTableMaintenanceState, DictionaryType } from './data'
import styles from './index.less'

const { Option } = Select

const basicColumns = [
  {
    dataIndex: 'key',
    title: '序号',
    align: 'center'
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    align: 'center',
    render: (createdTime: string) => <span>{createdTime && moment(createdTime).utc().format('YYYY-MM-DD HH:mm:ss')}</span>
  },
  {
    dataIndex: 'creator',
    title: '创建人',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    render: (record: DictionaryType) => <div style={{ width: 80 }} className="table-operate">
      <div>编辑</div>
      <div>删除</div>
    </div>
  }
]

const ownParams = [
  {
    dictionaryType: 1,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'name',
        title: '诊断内容',
        align: 'center'
      }
    ],
    searchPlaceholder: '模版内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'name',
        title: '医嘱内容',
        align: 'center'
      }
    ],
    searchPlaceholder: '模版内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 3,
    columns: [
      {
        dataIndex: 'type',
        title: '分类',
        align: 'center',
        render: (type: number) => <span>{CHIEF_COMPLAINT_TYPES.find(item => item.value === type)?.label}</span>
      },
      {
        dataIndex: 'name',
        title: '主诉内容',
        align: 'center'
      },
    ],
    searchPlaceholder: '主诉内容',
    filterFormItems: [
      {
        label: '主诉分类',
        name: 'type',
        component: <Select style={{ width: 100 }} allowClear={true}>
          {CHIEF_COMPLAINT_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
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
        align: 'center'
      }
    ],
    searchPlaceholder: '内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 5,
    columns: [
      {
        dataIndex: 'name',
        title: '既往史',
        align: 'center'
      }
    ],
    searchPlaceholder: '内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 6,
    columns: [
      {
        dataIndex: 'name',
        title: '过敏史',
        align: 'center'
      }
    ],
    searchPlaceholder: '内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 7,
    columns: [
      {
        dataIndex: 'name',
        title: '个人史',
        align: 'center'
      }
    ],
    searchPlaceholder: '内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 8,
    columns: [
      {
        dataIndex: 'name',
        title: '辅助检查情况',
        align: 'center'
      }
    ],
    searchPlaceholder: '内容'
  },
  {
    dictionaryType: 1,
    subDictionaryType: 9,
    columns: [
      {
        dataIndex: 'name',
        title: '治疗意见',
        align: 'center'
      }
    ],
    searchPlaceholder: '内容'
  },
  {
    dictionaryType: 2,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'type',
        title: '处方分类',
        align: 'center',
        render: (type: number) => <span>{PRESCRIPTION_TYPES.find(item => item.value === type)?.label}</span>
      },
      {
        dataIndex: 'name',
        title: '分类名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '分类名称',
    filterFormItems: [
      {
        label: '处方类别',
        name: 'type',
        component: <Select style={{ width: 120 }} allowClear={true}>
          {PRESCRIPTION_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
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
        render: (type: number) => <span>{PRESCRIPTION_TYPES.find(item => item.value === type)?.label}</span>
      },
      {
        dataIndex: 'name',
        title: '用法名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '用法名称',
    filterFormItems: [
      {
        label: '处方类别',
        name: 'type',
        component: <Select style={{ width: 120 }} allowClear={true}>
          {PRESCRIPTION_TYPES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
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
      }
    ],
    searchPlaceholder: '剂型名称'
  },
  {
    dictionaryType: 2,
    subDictionaryType: 4,
    columns: [
      {
        dataIndex: 'name',
        title: '项目名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '项目名称'
  },
  {
    dictionaryType: 2,
    subDictionaryType: 5,
    columns: [
      {
        dataIndex: 'name',
        title: '厂家名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '厂家名称'
  },
  {
    dictionaryType: 2,
    subDictionaryType: 6,
    columns: [
      {
        dataIndex: 'name',
        title: '单位名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '单位名称'
  },
  {
    dictionaryType: 2,
    subDictionaryType: 7,
    columns: [
      {
        dataIndex: 'name',
        title: '入库类型',
        align: 'center',
      }
    ],
    searchPlaceholder: '入库类型'
  },
  {
    dictionaryType: 2,
    subDictionaryType: 8,
    columns: [
      {
        dataIndex: 'name',
        title: '出库类型',
        align: 'center',
      }
    ],
    searchPlaceholder: '出库类型'
  },
  {
    dictionaryType: 3,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'name',
        title: '分类名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '分类名称'
  },
  {
    dictionaryType: 3,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'name',
        title: '单位名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '单位名称'
  },
  {
    dictionaryType: 4,
    subDictionaryType: 1,
    columns: [
      {
        dataIndex: 'name',
        title: '来源名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '来源名称'
  },
  {
    dictionaryType: 4,
    subDictionaryType: 2,
    columns: [
      {
        dataIndex: 'name',
        title: '学历名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '学历名称'
  },
  {
    dictionaryType: 4,
    subDictionaryType: 3,
    columns: [
      {
        dataIndex: 'name',
        title: '职业名称',
        align: 'center',
      }
    ],
    searchPlaceholder: '职业名称'
  },
]

interface DictionaryTableMaintenanceProps {
  dictionaryTableMaintenance: DictionaryTableMaintenanceState
}

const DictionaryTableMaintenance: React.FC<DictionaryTableMaintenanceProps> = props => {
  // props
  const { dictionaryTableMaintenance: { dictionaryList, total } } = props
  // useStatus
  const [titleField, setTitleField] = useState([
    { key: 'dictionaryType', value: DICTIONARY_TYPES[0].value },
    { key: 'subDictionaryType', value: DICTIONARY_TYPES[0].subTypes[0].value },
  ]) // 当前选中的一级tab和二级tab值
  const [columns, setColumns] = useState<any[]>([]) // 当前选中的table的columns
  const [searchPlaceholder, setSearchPlaceholder] = useState('') // 当前选中的table的searchPlaceholder
  const [filterFormItems, setFilterFormItems] = useState([]) // 当前选中的table的filterFormItems

  // titleField不同，参数不同 
  useEffect(() => {
    const newColumns = _.cloneDeep(basicColumns)
    // 需保证ownColumns中类型值与数据字典中的类型之保持一致！！！
    const ownParam: { [key: string]: any } | undefined = ownParams.find(item => {
      const currentDictionaryType = titleField.find(item => item.key === 'dictionaryType')?.value
      const currentSubDictionaryType = titleField.find(item => item.key === 'subDictionaryType')?.value
      return item.dictionaryType === currentDictionaryType && item.subDictionaryType === currentSubDictionaryType
    })
    if (ownParam) {
      // columns不同
      newColumns.splice(1, 0, ...ownParam.columns)
      setColumns(newColumns)

      // searchPlaceholder不同
      setSearchPlaceholder(ownParam.searchPlaceholder)

      // filterFormItems不同
      setFilterFormItems(ownParam.filterFormItems)
    }
  }, [titleField])

  // 一级tab Radio.Group选项变化时的回调函数
  const onTitleChange = (e: RadioChangeEvent) => {
    // 切换一级菜单，二级菜单从回到第一个
    setTitleField([
      { key: 'dictionaryType', value: e.target.value },
      { key: 'subDictionaryType', value: 1 }
    ])
  }

  // 二级tab Radio.Group选项变化时的回调函数
  const onSubTitleChange = (e: RadioChangeEvent) => {
    const dictionaryTypeObj = titleField.find(item => item.key === 'dictionaryType')
    if (dictionaryTypeObj) {
      setTitleField([dictionaryTypeObj, {
        key: 'subDictionaryType', value: e.target.value
      }])
    }
  }

  // 一级tab面板
  const title = <Radio.Group
    defaultValue={DICTIONARY_TYPES[0].value}
    buttonStyle="solid"
    onChange={onTitleChange}
  >
    {DICTIONARY_TYPES.map(item => <Radio.Button
      style={{ width: 100, textAlign: "center" }}
      key={item.value}
      value={item.value}
    >{item.label}</Radio.Button>)}
  </Radio.Group>

  // 二级tab面板
  const subTitle = <Radio.Group
    className={styles.radio}
    defaultValue={
      DICTIONARY_TYPES.find(item => {
        const currentTab = titleField.find(tf => tf.key === 'dictionaryType')?.value
        return item.value === currentTab
      })?.subTypes[0].value
    }
    buttonStyle="solid"
    value={titleField.find(item => item.key === 'subDictionaryType')?.value}
    onChange={onSubTitleChange}
  >
    {DICTIONARY_TYPES.find(item => {
      const currentTab = titleField.find(tf => tf.key === 'dictionaryType')?.value
      return item.value === currentTab
    })?.subTypes.map(item => <Radio.Button
      className={styles.subTitle}
      key={item.value}
      value={item.value}
    >{item.label}</Radio.Button>)}
  </Radio.Group>

  const GlobalTableProps = {
    title,
    dispatchType: 'dictionaryTableMaintenance/fetchDictionaryList',
    columns,
    dataSource: dictionaryList,
    total,
    subTitle,
    titleField,
    searchPlaceholder,
    filterFormItems
  }
  return <GlobalTable {...GlobalTableProps} />
}

export default connect(({ dictionaryTableMaintenance }: {
  dictionaryTableMaintenance: DictionaryTableMaintenanceState
}) => ({ dictionaryTableMaintenance }))(DictionaryTableMaintenance)