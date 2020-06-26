import React from 'react'
import { connect, history } from 'umi'
import moment from 'moment'
import { Button, Select } from 'antd'
import { PlusCircleFilled, DownloadOutlined, ExportOutlined } from '@ant-design/icons'

import GlobalTable from '@/components/GlobalTable'
import { USE_STATUSES } from '@/utils/dataDictionary'
import { CheckProjectSettingStateType, CheckProjectType } from './data'

const { Option } = Select

const columns = [
  {
    dataIndex: 'key',
    title: '序号',
    align: 'center'
  },
  {
    dataIndex: 'number',
    title: '项目编号',
    align: 'center'
  },
  {
    dataIndex: 'name',
    title: '项目名称',
    align: 'center'
  },
  {
    dataIndex: 'type',
    title: '项目类别',
    align: 'center'
  },
  {
    dataIndex: 'invoiceItems',
    title: '发票项目',
    align: 'center'
  },
  {
    dataIndex: 'retailPrice',
    title: '零售价',
    align: 'center'
  },
  {
    dataIndex: 'costPrice',
    title: '成本价',
    align: 'center'
  },
  {
    dataIndex: 'unit',
    title: '单位',
    align: 'center'
  },
  {
    dataIndex: 'status',
    title: '状态',
    align: 'center',
    render: (status: number) => <span>{USE_STATUSES.find(item => item.value === status)?.label}</span>
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    align: 'center',
    render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
  },
  {
    title: '操作',
    render: (record: CheckProjectType) => <div style={{ width: 100 }} className="table-operate">
      <Button type="link" onClick={() => { history.push(`/system-settings/check-project-setting/edit?id=${record.id}`) }}>编辑</Button>
      <Button type="link" onClick={() => { alert('暂未开发:需判断该项目是否正在使用') }}>停用</Button>
    </div>
  }
]

const filterFormItems = [
  {
    label: '项目状态',
    name: 'status',
    component: <Select style={{ width: 80 }} allowClear={true}>
      {USE_STATUSES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
    </Select>
  }
]

interface CheckProjectSettingProps {
  checkProjectSetting: CheckProjectSettingStateType;
}

const CheckProjectSetting: React.FC<CheckProjectSettingProps> = props => {
  // props
  const { checkProjectSetting: { checkProjectList, total } } = props

  // 右上角的按钮组
  const extra = <div>
    <Button
      type="primary"
      icon={<PlusCircleFilled />}
      onClick={() => { history.push('/system-settings/check-project-setting/add') }}
    >新增项目</Button>
    <Button ghost type="primary" icon={<DownloadOutlined />} style={{ marginLeft: 20 }}>导入</Button>
    <Button ghost type="primary" icon={<ExportOutlined />} style={{ marginLeft: 20 }}>导出</Button>
  </div>

  const GlobalTableProps = {
    dispatchType: 'checkProjectSetting/fetchCheckProjectList',
    dataSource: checkProjectList,
    total,
    columns,
    searchPlaceholder: '项目名称/项目编码',
    filterFormItems,
    extra
  }
  return <GlobalTable {...GlobalTableProps} />
}

export default connect(({ checkProjectSetting }: {
  checkProjectSetting: CheckProjectSettingStateType;
}) => ({ checkProjectSetting }))(CheckProjectSetting)