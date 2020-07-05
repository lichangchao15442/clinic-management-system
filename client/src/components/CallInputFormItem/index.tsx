import React from 'react'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface CallInputFormItemProps {
  label: string;
  name: string;
  onClickSearchIcon: (name: string, label: string) => void;
}

const CallInputFormItem: React.FC<CallInputFormItemProps> = ({ label, name, onClickSearchIcon }) => {
  return <Form.Item label={label} name={name}>
    <Input style={{ height: 100 }} readOnly suffix={<SearchOutlined style={{ fontSize: 18 }} onClick={() => onClickSearchIcon(name, label)} />} />
  </Form.Item>
}

export default CallInputFormItem