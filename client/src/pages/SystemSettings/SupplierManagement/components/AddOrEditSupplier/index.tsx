import React, { useEffect } from 'react'
import { Card, Button, Form, Row, Col, Input, Select, Radio, message } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { Store } from 'rc-field-form/lib/interface'
import { connect, history } from 'umi'

import { USE_STATUSES } from '@/utils/dataDictionary'
import request from '@/utils/request'
import { SupplierManagementState } from '../../data'

const { Option } = Select

const colProps = {
  lg: 6,
  md: 12,
}

interface AddOrEditSupplierProps {
  supplierManagement: SupplierManagementState;
  location: {
    query: {
      [key: string]: any
    }
  }
}

const AddOrEditSupplier: React.FC<AddOrEditSupplierProps> = props => {
  const [form] = Form.useForm()
  const { setFieldsValue } = form

  // props
  const {
    supplierManagement: { supplierNumber, operationType, supplierDetail },
    location: { query = {} }
  } = props

  // 新增时，为供应商编号表单自动项填充值
  useEffect(() => {
    operationType === 'add' && setFieldsValue({ number: supplierNumber })
  }, [supplierNumber, operationType])

  // 编辑时，表单数据回显
  useEffect(() => {
    operationType === 'edit' && setFieldsValue(supplierDetail)
  }, [supplierDetail, operationType])

  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: Store) => {
    let promise
    if (operationType === 'add') {
      promise = request('/addSupplier', {
        method: 'POST',
        data: {
          ...values,
          creator: '顾兰兰' // TODO: 应为当前登录人员，暂且写死
        }
      })
    } else if (operationType === 'edit') {
      promise = request('/editSupplier', {
        method: 'POST',
        data: {
          id: query.id,
          ...values,
          creator: '顾兰兰' // TODO: 应为当前登录人员，暂且写死
        }
      })
    }
    promise?.then((res) => {
      if (res.code === '1') {
        message.success('操作成功')
        history.push('/system-settings/supplier-management')
      }
    })
  }
  return <Form
    layout="vertical"
    form={form}
    initialValues={{
      status: 1
    }}
    onFinish={onFinish}
  >
    <Card
      className="card-no-border"
      title={<div className="title-icon-text">
        <span></span>
        <span>新增供应商</span>
      </div>}
      extra={
        <div>
          <Button type="primary" icon={<SaveFilled />} htmlType="submit">保存</Button>
          <Button
            ghost
            type="primary"
            icon={<CaretLeftOutlined />}
            style={{ marginLeft: 20 }}
            onClick={() => { history.goBack() }}
          >返回</Button>
        </div>
      }
    >
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="供应商编号" name="number">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="供应商名称"
            name="name"
            rules={[{ required: true, message: '请输入供应商名称' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="供应商状态"
            name="status"
          >
            <Radio.Group>
              {USE_STATUSES.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="联系人" name="contactPerson">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="联系电话" name="phone">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="备注" name="note">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  </Form>
}

export default connect(({ supplierManagement }: {
  supplierManagement: SupplierManagementState
}) => ({ supplierManagement }))(AddOrEditSupplier)