import React, { useEffect } from 'react'
import { Card, Form, Button, Row, Col, Input, Switch } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { connect, history } from 'umi'
import { Store } from 'rc-field-form/lib/interface'

import IconTitle from '@/components/IconTitle'
import { CommonState } from '@/models/common'
import request from '@/utils/request'
import { EmployeeManagementState } from '../../data'

const colProps = {
  xs: 24,
  md: 12,
  lg: 6
}

interface AddOrEditRoleProps {
  employeeManagement: EmployeeManagementState;
  common: CommonState;
  location: {
    query: { [key: string]: any }
  }
}

const AddOrEditRole: React.FC<AddOrEditRoleProps> = props => {
  // form
  const [form] = Form.useForm()
  const { setFieldsValue } = form

  // props
  const {
    employeeManagement: { operationType, roleDetail },
    common: { initNumber },
    location: {
      query
    }
  } = props

  /** 新增时，自动填充编号 */
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({ number: initNumber })
    }
  }, [initNumber])

  /** 编辑时，表单数据回显 */
  useEffect(() => {
    if (operationType === 'edit') {
      setFieldsValue(roleDetail)
    }
  }, [roleDetail])

  /** 提交表单且校验无误后调用的函数 */
  const onFinish = (values: Store) => {
    let promise
    if (operationType === 'add') {
      promise = request('/addRole', {
        method: 'POST',
        data: {
          ...values,
          creator: '顾兰兰', // TODO: 当前登录用户
        }
      })
    } else if (operationType === 'edit') {
      promise = request('/updateRole', {
        method: 'POST',
        data: {
          ...values,
          creator: '顾兰兰', // TODO: 当前登录用户
          id: query.id
        }
      })
    }
    promise && promise.then(res => {
      if (res.code === '1') {
        history.push('/system-settings/employee-management')
      }
    })
  }
  return <Form
    layout="vertical"
    form={form}
    initialValues={{
      status: true
    }}
    onFinish={onFinish}
  >
    <Card
      className="card-no-border"
      title={<IconTitle title={`${operationType === 'add' ? '新增' : '编辑'}角色信息`} />}
      extra={<div>
        <Button type="primary" icon={<SaveFilled />} htmlType="submit" >保存</Button>
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
          <Form.Item label="角色编号" name="number">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="角色名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="角色状态" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps} lg={12}>
          <Form.Item label="角色描述" name="description">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <div>TODO: 权限分配</div>
    </Card>
  </Form>
}

export default connect(({ employeeManagement, common }: {
  employeeManagement: EmployeeManagementState;
  common: CommonState;
}) => ({ employeeManagement, common }))(AddOrEditRole)