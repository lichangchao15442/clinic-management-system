import React from 'react'
import { Button } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { history } from 'umi'

interface SaveAndGoBackButtonsProsp {
  loading: boolean; // 保存按钮的加载状态
}

const SaveAndGoBackButtons: React.FC<SaveAndGoBackButtonsProsp> = ({ loading }) => {
  return <div>
    <Button type="primary" icon={<SaveFilled />} htmlType="submit" loading={loading}>保存</Button>
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