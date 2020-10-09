import React from 'react'
import { connect } from 'umi'
import moment from 'moment'
import { Button } from 'antd'
import { PlusCircleFilled, ExportOutlined } from '@ant-design/icons'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Store } from 'antd/lib/form/interface';

import { GlobalTable } from '@/components'
import { GENDERS, VIPLEVELS } from '@/utils/dataDictionary'
import { ITableColumn } from '@/components/GlobalTable/data'
import { PatientsManagementStateType, PatientType } from '../data'
import styles from './index.less'


const columns: ITableColumn<AnyObject>[] = [
  {
    dataIndex: 'number',
    title: '患者编号',
    align: 'center'
  },
  {
    dataIndex: 'name',
    title: '患者姓名',
    align: 'center',
    searchType: 'input',
    searchOrder: 2
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
    align: 'center',
    searchType: 'input',
    searchOrder: 3
  },
  {
    dataIndex: 'vipLevel',
    title: '会员等级',
    render: (vipLevel: number) => <span className={styles.vipLevel}>{VIPLEVELS.find(item => item.value === vipLevel)?.label}</span>,
    align: 'center',
    searchType: 'select',
    searchEnum: VIPLEVELS,
    searchOrder: 0
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
    align: 'center',
    searchType: 'dateRange',
    initialValue: [moment(), moment()],
    searchOrder: 1
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
    align: 'center',
    fixed: 'right',
    width: 200
  }
]

interface PatientsManagementProps {
  patients: PatientsManagementStateType;
}

const PatientsManagement: React.FC<PatientsManagementProps> = props => {
  // props
  const { patients } = props
  const { patientList, total } = patients

  /** 按钮组件 */
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

  const onTransformValues = (values: Store) => {
    const { name = '', phone = '' } = values
    const formatData: AnyObject = {}
    if (name) {
      formatData.name = name.trim()
    }
    if (phone) {
      formatData.phone = phone.trim()
    }
    return {
      ...values,
      ...formatData
    }
  }

  return <PageHeaderWrapper extra={extra} >
    <div className="global-container">
      <GlobalTable
        rowKey="number"
        dispatchType="patients/fetchPatientList"
        columns={columns}
        dataSource={patientList}
        pagination={{ total }}
        scroll={{ x: 1300 }}
        searchConfig={{ onTransformValues }}
      />
    </div>
  </PageHeaderWrapper>
}

export default connect(({ patients }: {
  patients: PatientsManagementStateType
}) => ({ patients }))(PatientsManagement)