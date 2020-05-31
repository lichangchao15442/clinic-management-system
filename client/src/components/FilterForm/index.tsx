import React, { ReactNode } from 'react'
import { Form, Input } from 'antd'
import { Store } from 'rc-field-form/lib/interface';

import styles from './index.less'

const { Search } = Input

// 查询条件数据类型
interface FilterFormItemType {
  label: string;
  name: string;
  component: ReactNode;
}
interface FilterFormProps {
  filterFormItems: FilterFormItemType[]; // 查询条件列表
  searchPlaceholder: string; // 搜索框的placeholder
  doSearch: (values: Store) => void; // 搜索交互
}

const FilterForm: React.FC<FilterFormProps> = ({ filterFormItems, searchPlaceholder, doSearch }) => {

  const [form] = Form.useForm()
  const { getFieldsValue } = form
  // 处理搜索点击事件
  const onSearch = async () => {
    // 手动收集表单的值
    const values = await getFieldsValue()
    doSearch(values)
  }
  return <Form
    className={styles.filterForm}
    layout="inline"
    form={form}
  >
    {filterFormItems.map(item => <Form.Item
      key={item.name}
      label={item.label}
      name={item.name}
    >
      {item.component}
    </Form.Item>)}
    <Form.Item name="search">
      <Search
        style={{ width: 370 }}
        placeholder={searchPlaceholder}
        onSearch={onSearch}
        enterButton
      />
    </Form.Item>
  </Form>
}

export default FilterForm