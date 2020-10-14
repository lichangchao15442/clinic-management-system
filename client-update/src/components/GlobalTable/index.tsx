import React, { useEffect, useState } from 'react';
import { connect, Loading } from 'umi';
import { Table, Card } from 'antd';
import { Store } from 'antd/lib/form/interface'

import { existy } from '@/utils/util';
import { ITable, ITableColumn } from './data';
import { PAGINATION } from './constant';
import styles from './index.less';
import SearchForm from './SearchForm';

const GlobalTable: React.FC<ITable<ITableColumn>> = <T extends {}>(props: ITable<T>) => {
  // props
  const {
    timestamp = 0,
    dispatchType,
    dispatch,
    dataSource = [],
    columns = [],
    showSerialNumber = true,
    pagination: { total } = {},
    scroll,
    searchConfig = {},
    resetConfig,
    extra,
    loading
  } = props;

  const { onTransformValues, extraQueryParams = {} } = searchConfig;

  const initialQuery = columns.reduce((pre, item) => {
    if ((item.dataIndex || item.formItemProps?.name) && existy(item.initialValue)) {
      return {
        ...pre,
        [item.dataIndex || item.formItemProps?.name]: item.initialValue
      }
    }
    return pre
  }, {})

  // state
  const [param, setParam] = useState({
    pagination: { pageNum: PAGINATION.DEFALUT_PAGENUM, pageSize: PAGINATION.DEFALUT_PAGESIZE },
    query: initialQuery
  })
  const [data, setDaata] = useState(dataSource)

  /** 生成最终发送接口的查询条件query */
  const formatQuery = () => {
    const { query } = param;
    const transformValues = onTransformValues ? onTransformValues(query) : query
    return {
      ...transformValues,
      ...extraQueryParams
    }
  }

  useEffect(() => {
    const { pagination } = param;
    dispatch({
      type: dispatchType,
      payload: {
        ...pagination,
        query: formatQuery()
      }
    })
  }, [param, timestamp])

  useEffect(() => {
    let newData = dataSource
    if (showSerialNumber) {
      // 数据中增加序号
      const { pagination: { pageNum, pageSize } } = param;
      newData = dataSource.map((item, index) => ({
        ...item,
        key: (pageNum - 1) * pageSize + index + 1
      }))
      // columns中增加序号字段
      const hasSerialNumber = columns.findIndex(item => item.title === '序号')
      hasSerialNumber === -1 && columns.unshift({ title: '序号', dataIndex: 'key', align: 'center' })
    }
    setDaata(newData)
  }, [dataSource])

  /**
   * 页码改变的回调
   * @param page 改变后的页码
   * @param pageSize 每页条数
   */
  const onPageNumChange = (page: number, size?: number) => {
    const { pagination: { pageSize } } = param
    setParam(preValue => ({
      ...preValue,
      pagination: {
        pageNum: page,
        pageSize: size || pageSize
      }
    }))
  }

  /**
   * pageSize 变化的回调
   * @param current 当前页码
   * @param size 每页条数
   */
  const onShowSizeChange = (current: number, size: number) => {
    setParam(preValue => ({
      ...preValue,
      pagination: {
        pageSize: size,
        pageNum: current
      }
    }))
  }

  const onSearch = (values: Store) => {
    setParam(preValue => ({
      ...preValue,
      query: values
    }))
  }

  return <Card className={styles.globalTableCard} bordered={false} title={<SearchForm columns={columns} onSearch={onSearch} searchConfig={searchConfig} resetConfig={resetConfig} extra={extra} />}>
    <Table
      loading={dispatchType ? loading?.effects[dispatchType] : false}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: param.pagination.pageSize,
        current: param.pagination.pageNum,
        total,
        showTotal: () => `每页${param.pagination.pageSize},共${total}条`,
        onChange: onPageNumChange,
        onShowSizeChange: onShowSizeChange,
        showQuickJumper: true
      }}
      scroll={scroll}
    />
  </Card>
}

export default connect(({ loading }: {
  loading: Loading;
}) => ({ loading }))(GlobalTable)