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
}

const AddOrEditDepartment: React.FC<AddOrEditDepartmentprops> = props => {
  // form
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  // props
  const { employeeManagement: { operationType }, common: { initNumber } } = props

  /** 自动填充编号 */
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({
        number: initNumber
      })
    }
  }, [initNumber])

  /** 提交表单且通过校验触发的回调函数 */
  const onFinish = (values: Store) => {
    console.log('onFinish', values)
    let promise
    if (operationType === 'add') {
      promise = request('/addDepartment', {
        method: 'POST',
        data: values
      })
    }
    promise && promise.then(res => {
      console.log('res', res)
      if (res.code === '1') {
        // TODO: 回到科室列表的tab（将tab放入model中，进行控制）
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