import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Avatar, Pagination, DatePicker, Select } from 'antd'
import { connect, Dispatch } from 'umi'
import moment from 'moment'
import classnames from 'classnames'
import { Store } from 'rc-field-form/lib/interface'

import { VIPLEVELS, GENDERS, ADMISSION_STATUSES, DEPARTMENTS } from '@/utils/dataDictionary'
import FilterForm from '@/components/FilterForm'
import { WorkBenchModalStateType } from './data'
import styles from './index.less'

const { RangePicker } = DatePicker
const { Option } = Select

const colProps = {
  sm: 24,
  lg: 12,
  xl: 8,
  xxl: 6
}

interface WorkbenchProps {
  workBench: WorkBenchModalStateType;
  dispatch: Dispatch;
  loading: boolean;
}

const Workbench: React.FC<WorkbenchProps> = props => {
  //props 
  const { workBench: { patientList, total }, dispatch, loading } = props

  // useState
  const [query, setQuery] = useState({}) // 搜索条件
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 9 }) // 当前分页参数

  // 查询表单的查询条件
  const filterFormItems = [
    {
      label: '创建时间',
      name: 'createdTime',
      component: <RangePicker style={{ width: 270 }} />
    },
    {
      label: '接诊状态',
      name: 'admissionStatus',
      component: <Select style={{ width: 100 }} allowClear={true}>
        {ADMISSION_STATUSES.map(item => <Option
          key={item.value}
          value={item.value}
        >{item.label}</Option>)}
      </Select>
    },
  ]

  // 请求符合当前条件的患者列表数据
  useEffect(() => {
    dispatch({
      type: 'workBench/fetchPatientList',
      payload: {
        query,
        ...pagination
      }
    })
  }, [query, pagination])

  // 页码改变的回调函数
  const onPageNumChange = (pageNum: number, pageSize?: number) => {
    setPagination({
      pageNum,
      pageSize: pageSize || 9
    })
  }

  // pageSize变化的回调
  const onPageSizeChange = (pageNum: number, pageSize: number) => {
    setPagination({
      pageNum,
      pageSize
    })
  }

  // 处理查询表单参数
  const doParseQueryValue = (values: Store) => {
    return {
      ...values,
      search: values.search.trim()
    }
  }

  // 处理搜索事件
  const doSearch = (values: Store) => {
    console.log('doSearch', values)
    setQuery(doParseQueryValue(values))
    // 从第一页开始显示
    setPagination({
      ...pagination,
      pageNum: 1
    })
  }

  // 查询表单组件的props
  const FilterFormProps = {
    filterFormItems,
    searchPlaceholder: '输入患者姓名',
    doSearch
  }

  return <Card
    className="card-no-border"
    title={<FilterForm  {...FilterFormProps} />}
    loading={loading}
  >
    <Row>
      {patientList.map(item => {
        const vipLevel = VIPLEVELS.find(vipLevel => vipLevel.value === item.vipLevel)?.label
        const gender = GENDERS.find(gender => gender.value === item.gender)?.label
        const admissionStatus = ADMISSION_STATUSES.find(admissionStatus => admissionStatus.value === item.admissionStatus)
        const department = DEPARTMENTS.find(department => department.value === item.department)?.label
        return (
          <Col {...colProps} key={item.id}>
            <Card
              className={styles.patientCard}
              actions={[
                <div key="admission" className={classnames(styles.onAdmission, styles.hoverAction)}>接诊</div>,
                <div
                  key="patientInfo"
                  className={classnames(styles.onPatientInfo, styles.hoverAction)}
                >查看患者信息</div>,
              ]}>
              <Row>
                <Col span={6}>
                  <Avatar src={item.avatar} size="large" />
                </Col>
                <Col span={18} style={{ color: '#999999' }}>
                  <div className={styles.basicInfo}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.vipLevel}>{vipLevel}</span>
                    <span>{gender}</span>
                    <span>{item.age}</span>
                    <span className={styles.admissionStatus} style={{ background: admissionStatus?.color }}>
                      {admissionStatus?.label}
                    </span>
                  </div>
                  <div>
                    <div>
                      <span>创建时间：</span>
                      <span>{item.createdTime && moment(item.createdTime).utc().format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div>
                      <span>科室：</span>
                      <span>{department}</span>
                      <span style={{ marginLeft: 40 }}>医生：</span>
                      <span>{item.doctorName}</span>
                    </div>
                    <div>
                      <span>手机号码：</span>
                      <span>{item.phone}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>)
      })}
    </Row>
    <div className={styles.pagination}>
      <Pagination
        total={total}
        showQuickJumper={true}
        current={pagination.pageNum}
        pageSize={pagination.pageSize}
        showTotal={(total, range) => `每页${pagination.pageSize}条,共${total}条`}
        onChange={onPageNumChange}
        onShowSizeChange={onPageSizeChange}
      />
    </div>
  </Card>
}

export default connect(({ workBench, loading }: {
  workBench: WorkBenchModalStateType;
  loading: {
    effects: {
      [key: string]: boolean;
    }
  }
}) => ({ workBench, loading: loading.effects['workBench/fetchPatientList'] }))(Workbench)