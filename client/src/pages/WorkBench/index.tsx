import React from 'react'
import { Card, Row, Col, Avatar } from 'antd'
import { connect } from 'umi'
import moment from 'moment'
import classnames from 'classnames'

import { VIPLEVELS, GENDERS, ADMISSION_STATUSES, DEPARTMENTS } from '@/utils/dataDictionary'
import { WorkBenchModalStateType } from './data'
import styles from './index.less'


const colProps = {
  sm: 24,
  lg: 12,
  xl: 8,
  xxl: 6
}

interface WorkbenchProps {
  workBench: WorkBenchModalStateType;
}

const Workbench: React.FC<WorkbenchProps> = props => {
  //props 
  const { workBench: { patientList, total } } = props
  return <Card className="card-no-border" title="工作台">
    <Row>
      {patientList.map(item => {
        const vipLevel = VIPLEVELS.find(vipLevel => vipLevel.value === item.vipLevel)?.label
        const gender = GENDERS.find(gender => gender.value === item.gender)?.label
        const admissionStatus = ADMISSION_STATUSES.find(admissionStatus => admissionStatus.value === item.admissionStatus)
        const department = DEPARTMENTS.find(department => department.value === item.department)?.label
        return (
          <Col {...colProps}>
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
                  <Avatar src={item.avatar} />
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
  </Card>
}

export default connect(({ workBench }: { workBench: WorkBenchModalStateType }) => ({ workBench }))(Workbench)