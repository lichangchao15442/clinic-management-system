import React, { useState } from 'react'
import { Radio, Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { history } from 'umi'

import { GlobalTable } from '@/components'



const TemplateMaintenance = () => {

  // 不同面板对应的不同数据
  const radios = [
    {
      key: 'medicalRecord',
      extra: <Button
        type="primary"
        icon={<PlusCircleFilled />}
        onClick={() => { history.push('/system-settings/template-maintenance/add-medical_record') }}
      >新增</Button>
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
    extra: currentRadioData.extra
  }
  return <GlobalTable {...globalTableProps} />
}

export default TemplateMaintenance