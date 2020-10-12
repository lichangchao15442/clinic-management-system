import React, { ReactNode, useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import _ from 'lodash';
import { Store } from 'antd/lib/form/interface'

import { ITableColumn } from './data';
import { handleFilterOption } from './util';
import { AnyObject } from 'typings';

interface SearchFormProps<T> {
  /** 搜索项数据 */
  columns: ITableColumn<T>[];
  onSearch: (values: Store) => void;
  /** 搜索按钮的配置 */
  searchConfig?: {
    /** 显隐 */
    visible?: boolean;
    /** 文字 */
    text: string;
  };
  /** 重置按钮的配置 */
  resetConfig?: {
    /** 显隐 */
    visible?: boolean;
    /** 文字 */
    text: string;
  };
  /** 额外的组件 */
  extra?: ReactNode;
}

const { Option } = Select;
const { RangePicker } = DatePicker;


const SearchForm = (props: SearchFormProps<AnyObject>) => {
  // form
  const [form] = Form.useForm()
  // props
  const { columns = [], searchConfig, resetConfig, extra, onSearch } = props;
  const { visible: searchVisible = true, text: searchText = '查询' } = searchConfig || {}
  const { visible: resetVisible = false, text: resetText = '重置' } = resetConfig || {}

  // state
  const [newColumns, setNewColumns] = useState(columns)

  useEffect(() => {
    // 设置搜索初始值
    const initValues: AnyObject = {}
    columns.forEach((item: ITableColumn<AnyObject>) => {
      const { showAll = true } = item.searchEnumConfig || {}
      const fieldName = item.formItemProps?.name || item.dataIndex
      if (item.initialValue !== undefined && fieldName) {
        initValues[fieldName] = item.initialValue
      }
      // 给select设置全部默认值
      if (fieldName && item.initialValue === undefined && item.searchType === 'select' && showAll) {
        initValues[fieldName] = null
      }
    })
    !_.isEmpty(initValues) && form.setFieldsValue(initValues)

    // 处理columns
    let columnsData = columns.filter((item: ITableColumn<AnyObject>) => item.searchType).map((item: ITableColumn<AnyObject>) => {
      let searchOrder = item.searchOrder || 0
      return {
        ...item,
        searchOrder
      }
    })
    columnsData = columnsData.sort((a: ITableColumn<AnyObject>, b: ITableColumn<AnyObject>) =>
      a.searchOrder - b.searchOrder
    )
    setNewColumns(columnsData)
  }, [columns])

  const renderComponent = (column: ITableColumn<AnyObject>) => {
    const { searchType, title, searchEnum = [], searchEnumConfig, formItemWidgetProps } = column;
    const { labelField = 'label', valueField = 'value', isFilter = false, showAll = true } = searchEnumConfig || {};
    let component = null;

    let newSearchEnum = [...searchEnum]
    const filterProps: AnyObject = {};
    if (searchType === 'select') {
      // searchEnum增加全部枚举
      if (showAll) {
        const obj: AnyObject = {}
        obj[labelField] = '全部'
        obj[valueField] = null
        newSearchEnum.unshift(obj)
      }
      // 增加Select模糊查询
      if (isFilter) {
        filterProps.showSearch = true;
        filterProps.filterOption = (inputValue: any, option: any) => handleFilterOption(inputValue, option);
      }
    }

    switch (searchType) {
      case 'input':
        component = <Input placeholder={`请输入${title}`} {...formItemWidgetProps} />;
        break;

      case 'select':
        component = <Select dropdownMatchSelectWidth={false} placeholder={`请选择${title}`} {...filterProps}  {...formItemWidgetProps}>
          {newSearchEnum.map((item: AnyObject) => <Option key={item[valueField]} value={item[valueField]} >{item[labelField]}</Option>)}
        </Select>;
        break;

      case 'date':
        component = <DatePicker placeholder={`请选择${title}`} {...formItemWidgetProps} />;
        break;

      case 'dateRange':
        component = <RangePicker placeholder={['开始时间', '结束时间']} {...formItemWidgetProps} />;
        break;

      default:
        break;
    }

    return component
  }

  return <Form form={form} layout="inline" onFinish={(values) => onSearch(values)} >
    <Row gutter={24}>
      {newColumns.map((item: ITableColumn<AnyObject>, index: number) => <Col key={index.toString()} style={{ marginBottom: 20 }} >
        {<Form.Item name={item.dataIndex} label={item.title} {...item.formItemProps} >
          {renderComponent(item)}
        </Form.Item>}
      </Col>)}
      {searchVisible && !!newColumns.length && <Col>
        <Form.Item>
          <Button type="primary" htmlType="submit">{searchText}</Button>
        </Form.Item>
      </Col>}
      {resetVisible && !!newColumns.length && <Col>
        <Form.Item>
          <Button ghost type="primary" >{resetText}</Button>
        </Form.Item>
      </Col>}
      {extra}
    </Row>
  </Form>
}

export default SearchForm