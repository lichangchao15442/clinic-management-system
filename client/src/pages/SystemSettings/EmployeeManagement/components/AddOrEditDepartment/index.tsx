import React from 'react'
import { Card, Form, Button, Row, Col, Input } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { history, connect } from 'umi'

import IconTitle from '@/components/IconTitle'
import { EmployeeManagementState } from '../../data'

const colProps = {
  lg: 6,
  md: 12,
  xs: 24
}

interface AddOrEditDepartmentprops {
  employeeManagement: EmployeeManagementState
}

const AddOrEditDepartment: React.FC<AddOrEditDepartmentprops> = props => {
  // props
  const { employeeManagement: { operationType } } = props
  return <Form>
    <Card
      className="card-no-border"
      title={<IconTitle title={`${operationType === 'add' ? '新增' : '编辑啊'}科室信息`} />}
      extra={<div>
        <Button type="primary" htmlType="submit" icon={<SaveFilled />}>保存</Button>
        <Button
          style={{ marginLeft: 20 }}
          ghost
          type="primary"
          icon={<CaretLeftOutlined />}
          onClick={() => { history.goBack() }}
        >返回</Button>
      </div>}
    >
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="科室编号" name="number">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  </Form>
}

export default connect(({ employeeManagement }: {
  employeeManagement: EmployeeManagementState
}) => ({ employeeManagement }))(AddOrEditDepartment)