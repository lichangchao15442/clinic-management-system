import React, { useEffect } from 'react'
import { connect, history } from 'umi'
import { Card, Form, Button, Row, Col, Input, Select, Cascader, Switch, message } from 'antd'
import { SaveFilled, CaretLeftOutlined } from '@ant-design/icons'
import { Store } from 'rc-field-form/lib/interface'
import _ from 'lodash'

import { AGE_UNITS, GENDERS } from '@/utils/dataDictionary'
import { validatePhoneFormat, validateIDNumberFormat, validatePasswordFormat } from '@/utils/utils'
import cities from '@/utils/city'
import request from '@/utils/request'
import { EmployeeManagementState } from '../../data'

const { Option } = Select

const colProps = {
  xs: 24,
  md: 12,
  lg: 6
}

interface AddOrEditEmployeeProps {
  employeeManagement: EmployeeManagementState;
  location: {
    query: {
      [key: string]: any
    }
  }
}

const AddOrEditEmployee: React.FC<AddOrEditEmployeeProps> = props => {
  // form
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  // props
  const {
    employeeManagement:
    {
      operationType,
      initEmployeeNumber,
      departmentList,
      roleList,
      employeeDetail
    },
    location: {
      query = {}
    }
  } = props

  // 新增员工时，自动填充员工编号
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({ number: initEmployeeNumber })
    }
  }, [operationType, initEmployeeNumber])

  // 编辑员工时，员工信息的回显
  useEffect(() => {
    if (operationType === 'edit' && !_.isEmpty(employeeDetail)) {
      setFieldsValue({
        ...employeeDetail,
        address: employeeDetail.address.split(' '),
        role: employeeDetail.role.split(' '),
      })
    }
  }, [operationType, employeeDetail])

  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: Store) => {
    // console.log('onFinish', values)
    const data = {
      ...values,
      address: values.address.join(" "), // 处理地址
      role: values.role.join(" "), // 处理角色
      creator: '顾兰兰', // TODO: 应为当前登录用户，暂且写死
      ownClinic: '仁心诊所', // TODO: 应为当前登录系统的诊所，暂且写死
    }
    let promise
    if (operationType === 'add') {
      promise = request('/addEmployee', {
        method: 'POST',
        data
      })
    } else if (operationType === 'edit') {
      promise = request('/editEmployee', {
        method: 'POST',
        data: {
          ...data,
          id: query.id
        }
      })
    }
    promise && promise.then((res) => {
      if (res.code === '1') { // 新增成功
        message.success('操作成功')
        history.push('/system-settings/employee-management')
      }
    })
  }

  return <Form
    layout="vertical"
    form={form}
    initialValues={{
      ageUnit: AGE_UNITS[0].value,
      gender: GENDERS[0].value,
      status: true
    }}
    onFinish={onFinish}
  >
    <Card
      className="card-no-border"
      title={<div className="title-icon-text">
        <span></span>
        <span>{`${operationType === 'add' ? '新增' : '编辑'}员工信息`}</span>
      </div>
      }
      extra={<div>
        <Button type="primary" icon={<SaveFilled />} htmlType="submit">保存</Button>
        <Button
          style={{ marginLeft: 20 }}
          ghost
          type="primary"
          icon={<CaretLeftOutlined
          />}
          onClick={() => { history.goBack() }}
        >返回</Button>
      </div>}
    >
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="员工编号" name="number">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="员工姓名"
            name="name"
            rules={[{ required: true, message: '请输入员工姓名！' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="员工年龄" required>
            <Input.Group compact>
              <Form.Item
                name="age"
                noStyle
                rules={[{ required: true, message: '请输入员工年龄！' },
                () => ({
                  validator(rule, value) {
                    if (!value) {
                      return Promise.reject()
                    }
                    if (!isNaN(Number(value))) {
                      return Promise.resolve()
                    }
                    return Promise.reject('请输入数字！')
                  }
                })]}
              >
                <Input style={{ width: 'calc(100% - 80px)' }} placeholder="请输入数字" />
              </Form.Item>
              <Form.Item
                name="ageUnit"
                noStyle
              >
                <Select style={{ width: 80 }}>
                  {AGE_UNITS.map(item =>
                    <Option key={item.value} value={item.value}>{item.label}</Option>)
                  }
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请输入员工姓名！' }]}
          >
            <Select>
              {GENDERS.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item
            label="手机号码"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              () => ({
                validator(rule, value) {
                  if (value) {
                    if (!validatePhoneFormat(value)) {
                      return Promise.reject('请输入正确的手机格式')
                    }
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="电子邮箱"
            name="email"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="证件号码"
            name="idNumber"
            validateTrigger="onBlur"
            rules={[
              () => ({
                validator(rule, value) {
                  if (value) {
                    if (!validateIDNumberFormat(value)) {
                      return Promise.reject('请输入正确的证件号码格式！')
                    }
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <Input placeholder="请输入证件号码" />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="职位" name="jobTitle">
            <Input placeholder="请输入职位名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="地址" name="address">
            <Cascader
              options={cities}
              expandTrigger="hover"
            />
          </Form.Item>
        </Col>
        <Col {...colProps} lg={12}>
          <Form.Item label=" " name="addressDetail">
            <Input placeholder="请输入详细地址" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="所属科室" name="department" rules={[{ required: true, message: '请选择所属科室' }]}>
            <Select placeholder="请选择">
              {departmentList.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="角色" name="role" rules={[{ required: true, message: '请至少选择一个角色' }]}>
            <Select placeholder="请选择" mode="multiple">
              {roleList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item
            label="密码"
            name="password"
            validateTrigger="onBlur"
            rules={[
              () => ({
                validator(rule, value) {
                  if (value) {
                    if (!validatePasswordFormat(value)) {
                      return Promise.reject('请输入正确的密码格式')
                    }
                  }
                  return Promise.resolve()
                }
              })
            ]}>
            <Input.Password placeholder="6-12位，包含数字和字母" />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="员工状态" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  </Form>
}

export default connect(({ employeeManagement }: {
  employeeManagement: EmployeeManagementState
}) => ({ employeeManagement }))(AddOrEditEmployee)