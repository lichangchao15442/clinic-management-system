import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Avatar, Pagination, DatePicker, Select, Empty } from 'antd'
import { connect, Dispatch } from 'umi'
import moment from 'moment'
import classnames from 'classnames'
import { Store } from 'rc-field-form/lib/interface'

import { VIPLEVELS, GENDERS, ADMISSION_STATUSES, DEPARTMENTS } from '@/utils/dataDictionary'
// import FilterForm from '@/components/FilterForm'
import SearchForm from '@/components/GlobalTable/SearchForm';
import { ITableColumn } from '@/components/GlobalTable/data';
import { WorkBenchModalStateType } from '../data'
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
  const [param, setParam] = useState({ pagination: { pageNum: 1, pageSize: 9 }, query: { createdTime: [moment(), moment()] } })

  const columns: ITableColumn<AnyObject>[] = [
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      searchType: 'dateRange',
      initialValue: [moment(), moment()]
    },
    {
      title: '接诊状态',
      dataIndex: 'admissionStatus',
      searchType: 'select',
      searchEnum: ADMISSION_STATUSES,
      initialValue: null
    },
    {
      title: '患者姓名',
      dataIndex: 'name',
      searchType: 'input',
    },
  ]

  /**
   * 处理查询表单参数
   * @param values 表单收集到的值
   */
  const doParseQueryValue = (values: Store) => {
    const { name = '' } = values;
    return {
      ...values,
      name: name.trim()
    }
  }

  /** 请求符合当前条件的患者列表数据 */
  useEffect(() => {
    const { pagination, query } = param
    dispatch({
      type: 'workBench/fetchPatientList',
      payload: {
        query: doParseQueryValue(query),
        ...pagination
      }
    })
  }, [param])

  /**
   * 页码改变的回调函数
   * @param pageNum 当前页数
   * @param pageSize 当前每页条数
   */
  const onPageNumChange = (pageNum: number, pageSize?: number) => {
    setParam(preValue => {
      const { query, pagination } = preValue
      return {
        query,
        pagination: {
          ...pagination,
          pageSize: pageSize || 9
        }
      }
    })
  }

  /**
   * pageSize变化的回调
   * @param pageNum 当前页数
   * @param pageSize 当前每页条数
   */
  const onPageSizeChange = (pageNum: number, pageSize: number) => {
    setParam(preValue => {
      const { query } = preValue
      return {
        query,
        pagination: {
          pageNum,
          pageSize
        }
      }
    })
  }

  /**
   * 处理搜索事件
   * @param values 表单收集到的值
   */
  const doSearch = (values: Store) => {
    setParam(preValue => {
      return {
        ...preValue,
        query: values,
      }
    })
  }


  return <Card
    className="card-no-border"
    title={<SearchForm columns={columns} onSearch={doSearch} />}
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
                      <span>{item.createdTime && moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
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
        current={param.pagination.pageNum}
        pageSize={param.pagination.pageSize}
        showTotal={(total, range) => `每页${param.pagination.pageSize}条,共${total}条`}
        onChange={onPageNumChange}
        onShowSizeChange={onPageSizeChange}
      />
    </div>
    {patientList.length === 0 && !loading && <Empty />}
  </Card >
}

export default connect(({ workBench, loading }: {
  workBench: WorkBenchModalStateType;
  loading: {
    effects: {
      [key: string]: boolean;
    }
  }
}) => ({ workBench, loading: loading.effects['workBench/fetchPatientList'] }))(Workbench)