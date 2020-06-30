import React, { ReactNode, useState } from 'react'
import { Card, Select, Form } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

import styles from './index.less'

const { Option } = Select

interface SelectDropdownFormItemProps {
  /** 表单项的属性 */
  formItemProps: {
    label: string;
    name: string;
    rules: { required: boolean }[]
  };
  /** 下拉框的数据源 */
  options: { [key: string]: any }[];
}

const SelectDropdownFormItem: React.FC<SelectDropdownFormItemProps> = ({ formItemProps, options }) => {
  // useState
  const [isOpen, setIsOpen] = useState(false) // 是否打开下拉框
  return <Form.Item {...formItemProps}>
    <Select
      mode="multiple"
      open={isOpen}
      onFocus={() => { setIsOpen(true) }}
      onBlur={() => { setIsOpen(false) }}
      dropdownRender={(menu: ReactNode) => <Card
        className={styles.card}
        bordered={false}
        title={formItemProps.label}
        extra={<CloseCircleOutlined style={{ fontSize: 20 }} onClick={() => { setIsOpen(false) }} />}
      >
        <div className={styles.menu}>
          <span>xxx:</span>
          {menu}
        </div>
      </Card>}>
      {options.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
    </Select>
  </Form.Item>
}

export default SelectDropdownFormItem