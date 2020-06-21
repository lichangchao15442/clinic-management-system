import React, { useState, ChangeEvent, useRef, useEffect } from 'react'
import { Card, Button, Form, Input, Row, Col, Select, Radio, Popconfirm, message } from 'antd'
import { SaveFilled, CaretLeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { connect, history } from 'umi'
import { Store } from 'rc-field-form/lib/interface'

import IconTitle from '@/components/IconTitle'
import { USE_STATUSES } from '@/utils/dataDictionary'
import request from '@/utils/request'
import { CommonState } from '@/models/common'
import { CheckProjectSettingStateType } from '../../data'
import styles from './index.less'

const colProps = {
  xs: 24,
  sm: 12,
  md: 6,
}
const { Option } = Select

interface AddOrEditCheckProjectProps {
  checkProjectSetting: CheckProjectSettingStateType;
  common: CommonState;
  location: {
    query: {
      [key: string]: any
    }
  }
}

const AddOrEditCheckProject: React.FC<AddOrEditCheckProjectProps> = props => {
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  // props
  const {
    checkProjectSetting: {
      unitList,
      projectTypeList,
      invoiceItemList,
      operationType,
      checkProjectDetail = {}
    },
    common: { initNumber },
    location: { query = {} }
  } = props

  // useState
  const [content, setContent] = useState('') // 自定义的内容（单位、项目分类、发票项目）

  // useRef
  const popConfirmFathter = useRef(null)

  // 组合框表单项集合
  const compactFormItems = [
    {
      label: '单位',
      name: 'unit',
      options: unitList,
    },
    {
      label: '项目分类',
      name: 'type',
      options: projectTypeList,
    },
    {
      label: '发票项目',
      name: 'invoiceItems',
      options: invoiceItemList,
    },
  ]

  // 给新增检查项目表单赋项目编号
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({
        number: initNumber
      })
    }
  }, [initNumber, operationType])

  // 为编辑时，数据回显
  useEffect(() => {
    if (operationType === 'edit') {
      checkProjectDetail && setFieldsValue(checkProjectDetail)
    }
  }, [checkProjectDetail, operationType])

  // 自定义内容的input值改变的回调
  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e', e.target.value)
    setContent(e.target.value)
  }

  /**
   * popconfirm点击确认的回调
   * @param name 表单项的name
   */
  const onConfirm = (name: string) => {
    // 1. 将值赋给对应表单项
    if (content !== '') {
      let obj: { [key: string]: any } = {}
      obj[name] = content
      setFieldsValue(obj)
    }

    // 2. 清除content的值
    setContent('')
  }

  // popconfirm点击取消的回调
  const onCancel = () => {
    // 清除content的值
    setContent('')
  }

  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: Store) => {
    // console.log('onFinish', values)
    let promise
    if (operationType === 'add') {
      promise = request('/addCheckProject', {
        method: 'POST',
        data: values
      })
    } else if (operationType === 'edit') {
      promise = request('/editCheckProject', {
        method: 'POST',
        data: {
          id: query.id,
          ...values
        }
      })
    }

    promise && promise.then((res) => {
      if (res.code === '1') {
        message.success('操作成功')
        // 返回列表页面
        history.push('/system-settings/check-project-setting')
      }
    })
  }

  return <Form
    form={form}
    layout="vertical"
    initialValues={{
      isAllowMemberDiscount: true,
      status: USE_STATUSES[0].value,
    }}
    onFinish={onFinish}
  >
    <Card
      className="card-no-border"
      title={<IconTitle title={`${operationType === 'add' ? '新增' : '编辑'}项目`} />}
      extra={<div>
        <Button type="primary" icon={<SaveFilled />} htmlType="submit">保存</Button>
        <Button
          ghost
          type="primary"
          icon={<CaretLeftOutlined />}
          style={{ marginLeft: 20 }}
          onClick={() => { history.goBack() }}
        >返回</Button>
      </div>}
    >
      <div className={styles.titleInfo}>项目信息</div>

      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="项目编码" name="number" >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item
            label="项目名称"
            name="name"
            required={true}
            validateTrigger="onBlur"
            rules={[
              () => ({
                validator(rule, value) {
                  if (!value || value.trim() === '') {
                    return Promise.reject('请输入项目名称')
                  }
                  // 项目名去重校验
                  const promise = request('/isCheckProjectNameExited', {
                    method: 'GET',
                    params: {
                      name: value,
                      id: query.id
                    }
                  })
                  return promise.then((res) => {
                    if (res.code === '1') {
                      if (res.data) { // 项目名重复
                        return Promise.reject('该项目名称已存在！')
                      }
                      return Promise.resolve()
                    }
                  })
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="成本价（元）" name="costPrice">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="零售价（元）" name="retailPrice">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        {compactFormItems.map(item =>
          <Col {...colProps} key={item.name}>
            <Form.Item label={item.label} required={true}>
              <Form.Item
                className={styles.compactSelect}
                name={item.name}
                rules={[{ required: true, message: `请选择${item.label}` }]}
              >
                <Select placeholder="请选择">
                  {item.options.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item className={styles.compactButton}>
                <div ref={popConfirmFathter} className={styles.popconfirm}>
                  <Popconfirm
                    title={<Input value={content} onChange={onContentChange} />}
                    onConfirm={() => { onConfirm(item.name) }}
                    onCancel={onCancel}
                    icon={null}
                    getPopupContainer={() => popConfirmFathter.current}
                    okText="保存"
                    cancelText="取消"
                  >
                    <PlusCircleOutlined />
                  </Popconfirm>
                </div>
              </Form.Item>
            </Form.Item>
          </Col>)
        }
        <Col {...colProps}>
          <Form.Item
            label="部位"
            name="part"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="允许会员折扣" name="isAllowMemberDiscount">
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="项目状态" name="status">
            <Radio.Group>
              {USE_STATUSES.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} >
          <Form.Item label="备注" name="note">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  </Form>
}

export default connect(({ checkProjectSetting, common }: {
  checkProjectSetting: CheckProjectSettingStateType;
  common: CommonState;
}) => ({ checkProjectSetting, common }))(AddOrEditCheckProject)