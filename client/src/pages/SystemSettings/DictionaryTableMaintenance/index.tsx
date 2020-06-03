import React, { useState, useEffect, useRef } from 'react'
import { Radio, Button } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import _ from 'lodash'
import { connect } from 'umi'
import moment from 'moment'
import { PlusCircleFilled } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'rc-field-form/lib/interface'

import GlobalTable from '@/components/GlobalTable'
import { DICTIONARY_TYPES } from '@/utils/dataDictionary'
import request from '@/utils/request'
import { FormItemType } from '@/typings'
import { ownParams } from './utils/dataDictionary'
import { DictionaryTableMaintenanceState, DictionaryType } from './data'
import { AddOrEditModal } from './components'
import styles from './index.less'



interface OwnParamType {
  dictionaryType: number; // 一级按钮组类型
  subDictionaryType: number; // 二级按钮组类型
  columns: any[]; // 不同类型的按钮的table组件单独的columns
  searchPlaceholder: string; // 不同类型的按钮的FilterForm组件单独的searchPlaceholder
  modalTitel: string; // 不同类型的按钮的新增/编辑modal的title
  modalFormItems: FormItemType[]; // 不同类型的按钮的新增/编辑modal的表单项集合
  filterFormItems?: FormItemType[]; // 不同类型的按钮的查询表单的表单项集合
}

interface DictionaryTableMaintenanceProps {
  dictionaryTableMaintenance: DictionaryTableMaintenanceState;
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
  const [filterFormItems, setFilterFormItems] = useState<FormItemType[]>([]) // 当前选中的table的filterFormItems
  const [modalVisible, setModalVisible] = useState(false) // 新增/编辑的modal的可见性
  const [modalProps, setModalProps] = useState<{ title: string; formItems: FormItemType[] }>({ title: ownParams[0].name || '', formItems: ownParams[0].modalFormItems || [] }) // modal的数据，包括标题的表单项集合
  const [isRefresh, setIsRefresh] = useState(false) // 是否刷新当前列表
  const [modalType, setModalType] = useState<'add' | 'edit'>('add') // modal的操作类型

  // useRef
  const modalForm = useRef<FormInstance>() // modal的form
  const currentDictionaryId = useRef<number>() // 当前编辑的数据的ID

  // console.log('isRefresh', isRefresh)

  // 得到modal的form
  const getForm = (form: FormInstance) => {
    modalForm.current = form
  }

  // 增加字典数据
  const onAddDictionary = () => {
    // 改变modal的操作类型为add
    setModalType('add')
    // 显示modal
    setModalVisible(true)
  }

  // 删除某条数字典表数据
  const onRemoveDictionary = (id: number) => {
    const promise = request('/deleteDictionary', {
      method: 'DELETE',
      data: {
        id
      }
    })
    promise.then((res) => {
      if (res.code === '1') { // 操作成功
        // 刷新列表
        console.log('onRemoveDictionary-isRefresh', isRefresh)
        // 注意：此处有一个bug：只能取到初始的isRefresh，原因：列表的列名改变导致
        setIsRefresh(!isRefresh)
      }
    })
  }

  // 编辑某条字典表数据
  const onEditDictionary = (record: DictionaryType) => {
    // 将编辑的数据保存ID，用于传递给后台
    currentDictionaryId.current = record.id
    // 改变当前modal操作类型为edit
    setModalType('edit')
    // 显示modal
    setModalVisible(true)
    // 给modal中的表单赋值
    modalForm.current?.setFieldsValue(record)
  }

  // 公共列名
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
      render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
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
        <Button type="link" onClick={() => { onEditDictionary(record) }}>编辑</Button>
        <Button type="link" onClick={() => { onRemoveDictionary(record.id) }}>删除</Button>
      </div>
    }
  ]

  // titleField不同，参数不同 
  useEffect(() => {
    const newColumns = _.cloneDeep(basicColumns)
    // 需保证ownColumns中类型值与数据字典中的类型之保持一致！！！
    const ownParam: OwnParamType = ownParams.find(item => {
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
      setFilterFormItems(ownParam.filterFormItems || [])

      // modalProps不同
      setModalProps({
        title: ownParam.modalTitel,
        formItems: ownParam.modalFormItems || []
      })
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

  // 点击modal确定按钮触发的回调
  const doOk = (values: Store) => {
    console.log('doOk', values)
    const currentDictionaryType = titleField.find(item => item.key === 'dictionaryType')?.value
    const currentSubDictionaryType = titleField.find(item => item.key === 'subDictionaryType')?.value
    // TODO: 发送请求（分为新增和编辑）
    if (modalType === 'add') { // 新增
      const promise = request('/addDictionary', {
        method: 'POST',
        data: {
          dictionaryType: currentDictionaryType,
          subDictionaryType: currentSubDictionaryType,
          ...values,
          creator: '顾兰兰' // TODO: 应为当前登录的用户，暂时写死
        }
      })
      promise.then((res) => {
        if (res.code === '1') { // 操作成功
          // 刷新当前列表
          setIsRefresh(!isRefresh)
          // 隐藏弹出框
          setModalVisible(false)
        }
      })
    } else { // 编辑
      const promise = request('/updateDictionary', {
        'method': 'POST',
        data: {
          id: currentDictionaryId.current,
          ...values
        }
      })
      promise.then((res) => {
        if (res.code === '1') { // 操作成功
          // 刷新当前列表
          setIsRefresh(!isRefresh)
          // 隐藏弹出框
          setModalVisible(false)
        }
      })
    }
  }

  // 点击modal取消按钮触发的回调
  const doCancel = () => {
    setModalVisible(false)
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

  // 右上角按钮
  const extra = <div>
    <Button
      type="primary"
      icon={<PlusCircleFilled />}
      onClick={onAddDictionary}
    >新增</Button>
  </div>

  const GlobalTableProps = {
    title,
    dispatchType: 'dictionaryTableMaintenance/fetchDictionaryList',
    // columns: basicColumns,
    columns,
    dataSource: dictionaryList,
    total,
    subTitle,
    titleField,
    searchPlaceholder,
    filterFormItems,
    extra,
    isRefresh
  }

  const AddOrEditModalprops = {
    visible: modalVisible,
    modalProps,
    doOk,
    doCancel,
    modalType,
    getForm
  }

  return <>
    <GlobalTable {...GlobalTableProps} />
    <AddOrEditModal {...AddOrEditModalprops} />
  </>
}

export default connect(({ dictionaryTableMaintenance }: {
  dictionaryTableMaintenance: DictionaryTableMaintenanceState
}) => ({ dictionaryTableMaintenance }))(DictionaryTableMaintenance)