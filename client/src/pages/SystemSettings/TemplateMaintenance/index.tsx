import React, { useState } from 'react'
import { Radio, Button, Select } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { history, connect } from 'umi'
import moment from 'moment'

import { GlobalTable } from '@/components'

import { TEMPLATES_AUTHORITIES } from '@/utils/dataDictionary'
import { TemplateMaintenanceState, MedicalRecordTemplateType } from './data'

const { Option } = Select

interface TemplateMaintenanceProps {
  templateMaintenance: TemplateMaintenanceState
}

const TemplateMaintenance: React.FC<TemplateMaintenanceProps> = (props) => {
  // props
  const { templateMaintenance: { medicalRecordTemplateList, total } } = props

  // 不同面板对应的不同数据
  const radios = [
    {
      key: 'medicalRecord',
      extra: <Button
        type="primary"
        icon={<PlusCircleFilled />}
        onClick={() => { history.push('/system-settings/template-maintenance/add-medical_record') }}
      >新增</Button>,
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          align: 'center'
        },
        {
          title: '模板编号',
          dataIndex: 'number',
          align: 'center'
        },
        {
          title: '模板名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '诊断',
          dataIndex: 'diagnosis',
          align: 'center'
        },
        {
          title: '模板权限',
          dataIndex: 'authority',
          align: 'center',
          render: (authority: 1 | 2) => {
            const item = TEMPLATES_AUTHORITIES.find(item => item.value === authority)
            return <span>{item?.label}</span>
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          align: 'center',
          render: (createdTime: string) => <span>{moment(createdTime).format('YYYY-MM-DD hh:mm:ss')}</span>
        },
        {
          title: '创建人员',
          dataIndex: 'creator',
          align: 'center',
        },
        {
          title: '操作',
          align: 'center',
          render: (record: MedicalRecordTemplateType) => <div style={{ width: 100 }} className="table-operate">
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </div>
        },
      ],
      searchPlaceholder: '模版编码/模版名称',
      filterFormItems: [
        {
          label: '模版权限',
          name: 'authority',
          component: <Select placeholder="请选择" allowClear style={{ width: 100 }}>
            {TEMPLATES_AUTHORITIES.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
          </Select>
        }
      ]
    },
    {
      key: 'prescription'
    }
  ]

  // useState
  const [currentRadioData, setCurrentRadioData] = useState(radios[0])


  const title = <Radio.Group defaultValue="medicalRecord" buttonStyle="solid">
    <Radio.Button value="medicalRecord">病历模版</Radio.Button>
    <Radio.Button value="prescription">处方模版</Radio.Button>
  </Radio.Group>

  const globalTableProps = {
    title,
    extra: currentRadioData.extra,
    dispatchType: 'templateMaintenance/fetchMedicalRecordTemplateList',
    dataSource: medicalRecordTemplateList,
    columns: currentRadioData.columns,
    searchPlaceholder: currentRadioData.searchPlaceholder,
    filterFormItems: currentRadioData.filterFormItems,
    total
  }
  return <GlobalTable {...globalTableProps} />
}

export default connect(({ templateMaintenance }: {
  templateMaintenance: TemplateMaintenanceState
}) => ({ templateMaintenance }))(TemplateMaintenance)