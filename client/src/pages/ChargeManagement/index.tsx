import React, { useState, useEffect } from 'react'
import { connect } from 'umi'
import moment from 'moment'
import { Select, DatePicker, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import _ from 'lodash'

import GlobalTable from '@/components/GlobalTable'
import { ORDER_STATUSES, DEPARTMENTS, CHARGE_STATUSES, PAYMENT_METHODS } from '@/utils/dataDictionary'
import { ChargeManagementStateType, OrderListType } from './data'

const { Option } = Select
const { RangePicker } = DatePicker

// table的columns
const basicColumns = [
  {
    dataIndex: 'key',
    title: '序号',
    align: 'center'
  },
  {
    dataIndex: 'number',
    title: '订单编号',
    align: 'center'
  },
  {
    dataIndex: 'type',
    title: '订单类型',
    align: 'center',
    render: (type: number) => <span>{ORDER_STATUSES.find(item => item.value === type)?.label}</span>
  },
  {
    dataIndex: 'name',
    title: '姓名',
    align: 'center'
  },
  {
    dataIndex: 'age',
    title: '年龄',
    align: 'center'
  },
  {
    dataIndex: 'phone',
    title: '手机号',
    align: 'center'
  },
  {
    dataIndex: 'department',
    title: '科室',
    align: 'center',
    render: (department: number) => <span>{DEPARTMENTS.find(item => item.value === department)?.label}</span>
  },
  {
    dataIndex: 'doctorName',
    title: '接诊医生',
    align: 'center'
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    align: 'center',
    render: (createdTime: string) => <span>{createdTime && moment(createdTime).utc().format('YYYY-MM-DD HH:mm:ss')}</span>
  },
]

// 查询表单的表单项
const filterFormItems = [
  {
    label: '订单类型',
    name: 'type',
    component: <Select style={{ width: 100 }} allowClear={true}>
      {ORDER_STATUSES.map(item => <Option
        key={item.value}
        value={item.value}
      >{item.label}</Option>)}
    </Select>
  },
  {
    label: '创建时间',
    name: 'createdTime',
    component: <RangePicker style={{ width: 270 }} />
  }
]

interface ChargeManagementProps {
  chargeManagement: ChargeManagementStateType
}

const ChargeManagement: React.FC<ChargeManagementProps> = props => {
  // props 
  const { chargeManagement } = props
  const { orderList, total } = chargeManagement

  // useState
  const [curChargeStatus, setCurChargeStatus] = useState([{ key: 'chargeStatus', value: CHARGE_STATUSES[0].value }]) // 当前收费状态按钮组选中按钮的键值
  const [curColumns, setCurColumns] = useState(basicColumns) // 当前columns

  // 根据收费状态不同，处理columns的不同
  useEffect(() => {
    let columns: any[] = _.cloneDeep(basicColumns)
    let ownColumns: any[]
    const type = curChargeStatus.find(item => item.key === 'chargeStatus')?.value
    switch (type) {
      case 1:
        ownColumns = [
          {
            dataIndex: 'amountReceivable',
            title: '应收金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'chargeStatus',
            title: '收费状态',
            align: 'center',
            render: (chargeStatus: number) => {
              const chargeStatusItem = CHARGE_STATUSES.find(item => item.value === chargeStatus)
              return <span style={{ color: chargeStatusItem?.color }}> {chargeStatusItem?.label}</span >
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (record: OrderListType) => <div className="table-operate" style={{ width: 100 }}>
              <div>收费</div>
              <div>编辑</div>
              <div>删除</div>
            </div>
          }
        ]
        break;
      case 2:
        ownColumns = [
          {
            dataIndex: 'amountReceivable',
            title: '应收金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'amountReceived',
            title: '实收金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'paymentMethod',
            title: '支付方式',
            align: 'center',
            render: (paymentMethod: number) => <span>{PAYMENT_METHODS.find(item => item.value === paymentMethod)?.label}</span>
          },
          {
            dataIndex: 'chargeStatus',
            title: '收费状态',
            align: 'center',
            render: (chargeStatus: number) => {
              const chargeStatusItem = CHARGE_STATUSES.find(item => item.value === chargeStatus)
              return <span style={{ color: chargeStatusItem?.color }}> {chargeStatusItem?.label}</span >
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (record: OrderListType) => <div className="table-operate" style={{ width: 80 }}>
              <div>查看</div>
              <div>退费</div>
            </div>
          }
        ]
        break;
      case 3:
        ownColumns = [
          {
            dataIndex: 'amountRefund',
            title: '退费金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'refundMethod',
            title: '退费方式',
            align: 'center',
            render: (paymentMethod: number) => <span>{PAYMENT_METHODS.find(item => item.value === paymentMethod)?.label}</span>
          },
          {
            dataIndex: 'chargeStatus',
            title: '收费状态',
            align: 'center',
            render: (chargeStatus: number) => {
              const chargeStatusItem = CHARGE_STATUSES.find(item => item.value === chargeStatus)
              return <span style={{ color: chargeStatusItem?.color }}> {chargeStatusItem?.label}</span >
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (record: OrderListType) => <div className="table-operate" style={{ width: 'unset' }}>
              <div>查看</div>
            </div>
          }
        ]
        break;
      default:
        ownColumns = []
        break;
    }
    columns.push(...ownColumns)

    setCurColumns(columns)
  }, [curChargeStatus])

  // Radio.Group选项变化时的回调函数
  const onChange = (e: RadioChangeEvent) => {
    setCurChargeStatus([{
      key: 'chargeStatus',
      value: e.target.value
    }])
  }

  // 左上角的按钮组
  const title = <Radio.Group
    defaultValue={CHARGE_STATUSES[0].value}
    buttonStyle="solid"
    onChange={onChange}
  >
    {CHARGE_STATUSES.map(item => <Radio.Button
      style={{ width: 100, textAlign: "center" }}
      key={item.value}
      value={item.value}
    >{item.label}</Radio.Button>)}
  </Radio.Group>

  const GlobalTableProps = {
    dispatchType: 'chargeManagement/fetchOrderList',
    dataSource: orderList,
    total,
    columns: curColumns,
    filterFormItems,
    searchPlaceholder: '输入订单编号/患者姓名',
    title,
    titleField: curChargeStatus
  }
  return <GlobalTable {...GlobalTableProps} />
}

export default connect(({ chargeManagement }: {
  chargeManagement: ChargeManagementStateType
}) => ({ chargeManagement }))(ChargeManagement)