import React, { useState, useEffect, ReactNode } from 'react'
import { Card, Table, Spin } from 'antd'
import { connect, Dispatch } from 'umi'
import { Store } from 'rc-field-form/lib/interface'

import FilterForm, { FilterFormItemType } from '../FilterForm'
import styles from './index.less'


interface GlobalTableProps {
  columns: any[]; // table的columns
  dataSource: any[]; // table的数据源
  total: number; // 数据总数
  dispatchType: string; // dispatch的type
  dispatch: Dispatch;
  loading: {
    effects: {
      [key: string]: boolean;
    }
  };
  filterFormItems: FilterFormItemType[]; //查询条件列表
  searchPlaceholder: string; //搜索框的placeholder
  extra: ReactNode; // GlobalTable的右上角（一般为按钮组件）
}

const GlobalTable: React.FC<GlobalTableProps> = ({
  columns,
  dataSource,
  total,
  dispatch,
  dispatchType,
  loading,
  filterFormItems,
  searchPlaceholder,
  extra
}) => {
  // useState
  const [data, setData] = useState<any[]>([]) // table数据源
  const [query, setQuery] = useState({}) // 查询条件参数
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 }) // 分页参数

  // 为数据源增加序号
  useEffect(() => {
    const newData = dataSource.map((item: any, index: number) => ({
      ...item,
      key: (pagination.pageNum - 1) * pagination.pageSize + index + 1
    }))
    setData(newData)
  }, [dataSource])

  // 请求数据
  useEffect(() => {
    dispatch({
      type: dispatchType,
      payload: {
        query,
        ...pagination
      }
    })
  }, [query, pagination])

  // pageNum改变触发的回调
  const onPageNumChange = (pageNum: number, pageSize?: number) => {
    setPagination({
      pageNum,
      pageSize: pageSize || pagination.pageSize
    })
  }

  // pageSize改变触发的回调
  const onPageSizeChange = (pageNum: number, pageSize: number) => {
    // 从第一页开始展示数据
    setPagination({
      pageNum: 1,
      pageSize
    })
  }

  // 处理查询参数
  const doParseQueryValue = (values: Store) => {
    return {
      ...values,
      search: values.search && values.search.trim()
    }
  }

  // 搜索
  const doSearch = (values: Store) => {
    setQuery(doParseQueryValue(values))
  }

  const FilterFormProps = {
    filterFormItems,
    searchPlaceholder,
    doSearch
  }

  return <Card
    className={styles.globalTableCard}
    // title="全局table的title"
    extra={extra}
  >
    <FilterForm  {...FilterFormProps} />
    <Spin tip="正在加载中..." spinning={loading.effects[dispatchType]}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total,
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          showQuickJumper: true,
          showTotal: total => `每页${pagination.pageSize}条，共${total}条`,
          onChange: onPageNumChange,
          onShowSizeChange: onPageSizeChange
        }}
      />
    </Spin>
  </Card>
}

export default connect(({ loading }: {
  loading: {
    effects: {
      [key: string]: boolean;
    }
  }
}) => ({ loading }))(GlobalTable)