import React, { useState, ChangeEvent, useRef } from 'react'
import { Card, Button, Form, Input, Row, Col, Select, Radio, Popconfirm } from 'antd'
import { SaveFilled, CaretLeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { connect } from 'umi'

import { USE_STATUSES } from '@/utils/dataDictionary'
import styles from './index.less'
import { CheckProjectSettingStateType } from '../../data'

const colProps = {
  xs: 24,
  sm: 12,
  md: 6,
}
const { Option } = Select

interface AddOrEditCheckProjectProps {
  checkProjectSetting: CheckProjectSettingStateType
}

const AddOrEditCheckProject: React.FC<AddOrEditCheckProjectProps> = props => {
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  // props
  const { checkProjectSetting: { unitList, projectTypeList, invoiceItemList } } = props

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

  return <Card
    className="card-no-border"
    title={<div>
      <span className={styles.titleIcon}></span>
      <span className={styles.titleText}>新增项目</span>
    </div>}
    extra={<div>
      <Button type="primary" icon={<SaveFilled />}>保存</Button>
      <Button
        ghost
        type="primary"
        icon={<CaretLeftOutlined />}
        style={{ marginLeft: 20 }}
      >返回</Button>
    </div>}
  >
    <div className={styles.titleInfo}>项目信息</div>
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        isAllowMemberDiscount: true,
        status: USE_STATUSES[0].value
      }}
    >
      <Row gutter={24}>
        <Col {...colProps}>
          <Form.Item label="项目编码" name="number">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item label="项目名称" name="name">
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
    </Form>
  </Card>
}

export default connect(({ checkProjectSetting }: {
  checkProjectSetting: CheckProjectSettingStateType
}) => ({ checkProjectSetting }))(AddOrEditCheckProject)