import React, { useState, useRef } from 'react'
import { connect, history } from 'umi'
import moment from 'moment'
import { Button, message } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'

import GlobalTable from '@/components/GlobalTable'
import { USE_STATUSES } from '@/utils/dataDictionary'
import request from '@/utils/request'
import { DeleteConfirmModal } from '@/components'
import { SupplierManagementState, SupplierType } from './data'


interface SupplierManagementProps {
  supplierManagement: SupplierManagementState
}

const SupplierManagement: React.FC<SupplierManagementProps> = props => {
  // props
  const { supplierManagement: { supplierList, total } } = props

  // useState
  const [isRefresh, setIsRefresh] = useState(false) // 刷新当前列表的开关
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false) // 删除确认弹窗框的显隐

  // useRef
  const currentSupplierId = useRef<number | null>(null) // 当前操作的供应商ID

  /** 显示删除确认框 */
  const onRemoveSupplier = (id: number) => {
    setDeleteConfirmModalVisible(true)
    currentSupplierId.current = id
  }

  /** 删除某条供应商数据的请求 */
  const fetchRemoveSupplier = () => {
    const promise = request('/deleteSupplier', {
      method: 'DELETE',
      data: {
        id: currentSupplierId.current
      }
    })
    promise.then((res) => {
      if (res.code === '1') {
        message.success('供应商删除成功！')
        // 隐藏删除确认框
        setDeleteConfirmModalVisible(false)
        // 刷新列表
        setIsRefresh(!isRefresh)
      }
    })
  }

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
        <Button type="link" onClick={() => { onRemoveSupplier(record.id) }}>删除</Button>
      </div>
    }
  ]

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
    extra,
    isRefresh
  }

  const deleteConfirmModalProps = {
    visible: deleteConfirmModalVisible,
    content: '确定要删除此供应商信息吗？',
    onOk: fetchRemoveSupplier,
    onCancel: () => { setDeleteConfirmModalVisible(false) }
  }
  return <>
    <GlobalTable {...globalTableProps} />
    <DeleteConfirmModal {...deleteConfirmModalProps} />
  </>
}

export default connect(({ supplierManagement }: {
  supplierManagement: SupplierManagementState
}) => ({ supplierManagement }))(SupplierManagement) 