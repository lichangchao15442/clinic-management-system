import React from 'react'
import { connect } from 'umi'
import moment from 'moment'
import { Select, DatePicker, Button } from 'antd'
import { PlusCircleFilled, ExportOutlined } from '@ant-design/icons'

import GlobalTable from '@/components/GlobalTable'
import { GENDERS, VIPLEVELS } from '@/utils/dataDictionary'
import { PatientsManagementStateType, PatientType } from './data'
import styles from './index.less'


const { Option } = Select
const { RangePicker } = DatePicker

const columns = [
  {
    dataIndex: 'key',
    title: '序号',
    align: 'key'
  },
  {
    dataIndex: 'number',
    title: '患者编号',
    align: 'center'
  },
  {
    dataIndex: 'name',
    title: '患者姓名',
    align: 'center'
  },
  {
    dataIndex: 'gender',
    title: '患者性别',
    render: (gender: number) => <span>{GENDERS.find(item => item.value === gender)?.label}</span>,
    align: 'center'
  },
  {
    dataIndex: 'age',
    title: '患者年龄',
    align: 'center'
  },
  {
    dataIndex: 'phone',
    title: '手机号码',
    align: 'center'
  },
  {
    dataIndex: 'vipLevel',
    title: '会员等级',
    render: (vipLevel: number) => <span className={styles.vipLevel}>{VIPLEVELS.find(item => item.value === vipLevel)?.label}</span>,
    align: 'center'
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    render: (createdTime: string) => <span>{createdTime && moment(createdTime).utc().format('YYYY-MM-DD HH:mm:ss')}</span>,
    align: 'center'
  },
  {
    dataIndex: 'operator',
    title: '操作人员',
    align: 'center'
  },
  {
    title: '操作',
    render: (record: PatientType) => <div className="table-operate">
      <div>接诊</div>
      <div>编辑</div>
      <div>设置会员</div>
      <div>删除</div>
    </div>,
    align: 'center'
  }
]

// 查询表单的表单项列表
const filterFormItems = [
  {
    label: '会员类型',
    name: 'vipLevel',
    component: <Select style={{ width: 100 }} allowClear={true}>
      {VIPLEVELS.map(item => <Option
        key={item.value}
        value={item.value}
      >{item.label}</Option>)
      }
    </Select>
  },
  {
    label: '创建时间',
    name: 'createdTime',
    component: <RangePicker style={{ width: 270 }} />
  }
]

interface PatientsManagementProps {
  patientsManagement: PatientsManagementStateType;
}

const PatientsManagement: React.FC<PatientsManagementProps> = props => {
  // props
  const { patientsManagement } = props
  const { patientList, total } = patientsManagement

  // 按钮组件
  const extra = <div>
    <Button
      style={{ marginRight: 20 }}
      type="primary"
      icon={<PlusCircleFilled />}
    >新增患者</Button>
    <Button
      ghost
      type="primary"
      icon={<ExportOutlined />}
    >导出</Button>
  </div>

  // GobalTable 的props
  const GlobalTableProps = {
    columns,
    dataSource: patientList,
    total,
    dispatchType: 'patientsManagement/fetchPatientList',
    filterFormItems,
    searchPlaceholder: '患者姓名/手机号码',
    extra
  }
  return <GlobalTable {...GlobalTableProps} />
}

export default connect(({ patientsManagement }: {
  patientsManagement: PatientsManagementStateType
}) => ({ patientsManagement }))(PatientsManagement)