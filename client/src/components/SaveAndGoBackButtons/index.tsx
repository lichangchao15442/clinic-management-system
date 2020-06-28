import React from 'react'
import { Button } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { history } from 'umi'

const SaveAndGoBackButtons = () => {
  return <div>
    <Button type="primary" icon={<SaveFilled />} htmlType="submit">保存</Button>
    <Button
      ghost
      type="primary"
      icon={<CaretLeftOutlined />}
      style={{ marginLeft: 20 }}
      onClick={() => { history.goBack() }}
    >返回</Button>
  </div>
}

export default SaveAndGoBackButtons