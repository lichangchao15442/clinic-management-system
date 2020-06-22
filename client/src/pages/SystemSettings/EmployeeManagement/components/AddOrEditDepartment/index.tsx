import React, { useEffect } from 'react'
import { Card, Form, Button, Row, Col, Input, Switch } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { history, connect } from 'umi'
import moment from 'moment'
import { Store } from 'rc-field-form/lib/interface'

import IconTitle from '@/components/IconTitle'
import { CommonState } from '@/models/common'
import request from '@/utils/request'
import { EmployeeManagementState } from '../../data'

const colProps = {
  lg: 6,
  md: 12,
  xs: 24
}

interface AddOrEditDepartmentprops {
  employeeManagement: EmployeeManagementState;
  common: CommonState;
  location: {
    query: { [key: string]: any }
  }
}

const AddOrEditDepartment: React.FC<AddOrEditDepartmentprops> = props => {
  // form
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  // props
  const {
    employeeManagement: { operationType, departmentDetail },
    common: { initNumber },
    location: { query }
  } = props

  /** 自动填充编号 */
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({
        number: initNumber
      })
    }
  }, [initNumber])

  /** 当前操作为编辑表单时，回显表单值 */
  useEffect(() => {
    if (operationType === 'edit') {
      setFieldsValue({
        ...departmentDetail,
        createdTime: moment(departmentDetail.createdTime).format('YYYY-MM-DD hh:mm:ss')
      })
    }
  }, [operationType, departmentDetail])

  /** 提交表单且通过校验触发的回调函数 */
  const onFinish = (values: Store) => {
    console.log('onFinish', values)
    let promise
    if (operationType === 'add') {
      promise = request('/addDepartment', {
        method: 'POST',
        data: values
      })
    } else if (operationType === 'edit') {
      promise = request('/updateDepartment', {
        method: 'POST',
        data: {
          ...values,
          id: query.id
        }
      })
    }
    promise && promise.then(res => {
      console.log('res', res)
      if (res.code === '1') {
        history.push('/system-settings/employee-management')
      }
    })
  }
  return <Form
    form={form}
    layout="vertical"
    initialValues={{
      status: true,
      creator: '顾兰兰', // TODO: 取当前登录用户
      createdTime: moment().format('YYYY-MM-DD hh:mm:ss')
    }}
    onFinish={onFinish}
  >
    <Card
      className="card-no-border"
      title={<IconTitle title={`${operationType === 'add' ? '新增' : '编辑'}科室信息`} />}
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
        <Col {...colProps}>
          <Form.Item label="科室名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="科室状态" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col sm={12} xs={24}>
          <Form.Item label="科室简介" name="introduction">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="创建人" name="creator">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="创建时间" name="createdTime">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  </Form >
}

export default connect(({ employeeManagement, common }: {
  employeeManagement: EmployeeManagementState;
  common: CommonState;
}) => ({ employeeManagement, common }))(AddOrEditDepartment)