import React from 'react'
import { connect, history } from 'umi'
import moment from 'moment'
import { Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'

import GlobalTable from '@/components/GlobalTable'
import { USE_STATUSES } from '@/utils/dataDictionary'
import { SupplierManagementState, SupplierType } from './data'

const columns = [
  {
    dataIndex: 'key',
    title: '序号',
    align: 'center'
  },
  {
    dataIndex: 'number',
    title: '供应商编号',
    align: 'center',
  },
  {
    dataIndex: 'name',
    title: '供应商名称',
    align: 'center'
  },
  {
    dataIndex: 'contactPerson',
    title: '联系人',
    align: 'center'
  },
  {
    dataIndex: 'phone',
    title: '联系电话',
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
    title: '创建人员',
    align: 'center'
  },
  {
    dataIndex: 'status',
    title: '供应商状态',
    align: 'center',
    render: (status: number) => <span>{USE_STATUSES.find(item => item.value === status)?.label}</span>
  },
  {
    title: '操作',
    render: (record: SupplierType) => <div style={{ width: 100 }} className="table-operate">
      <Button type="link" onClick={() => { history.push(`/system-settings/supplier-management/edit?id=${record.id}`) }}>编辑</Button>
      <Button type="link">删除</Button>
    </div>
  }
]

interface SupplierManagementProps {
  supplierManagement: SupplierManagementState
}

const SupplierManagement: React.FC<SupplierManagementProps> = props => {
  // props
  const { supplierManagement: { supplierList, total } } = props

  const extra = <div>
    <Button
      type="primary"
      icon={<PlusCircleFilled />}
      onClick={() => { history.push('/system-settings/supplier-management/add') }}
    >新增</Button>
  </div>
  const globalTableProps = {
    dispatchType: 'supplierManagement/fetchSupplierList',
    dataSource: supplierList,
    total,
    columns,
    searchPlaceholder: '供应商名称',
    extra
  }
  return <GlobalTable {...globalTableProps} />
}

export default connect(({ supplierManagement }: {
  supplierManagement: SupplierManagementState
}) => ({ supplierManagement }))(SupplierManagement) 