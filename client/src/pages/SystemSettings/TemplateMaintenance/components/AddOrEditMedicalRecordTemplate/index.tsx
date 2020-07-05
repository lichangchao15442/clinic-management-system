import React, { useEffect, useState, useRef } from 'react'
import { Card, Form, Row, Col, Input, Radio, Select, message } from 'antd'
import { connect, history } from 'umi'
import moment from 'moment'
import { Store } from 'rc-field-form/lib/interface'

// TODO: 给保存按钮增加loading！！！

import {
  IconTitle,
  SaveAndGoBackButtons,
  SelectDropdownFormItem,
  CallTableModal,
  CallInputFormItem
} from '@/components'
import { CommonState } from '@/models/common'
import { TEMPLATES_TYPES, TEMPLATES_AUTHORITIES } from '@/utils/dataDictionary'
import request from '@/utils/request'
import styles from './index.less'

const { Option } = Select
const { TextArea } = Input

const colProps = {
  lg: 6,
  md: 12,
  sm: 24
}

interface AddOrEditMedicalRecordTemplateProps {
  common: CommonState
}

const AddOrEditMedicalRecordTemplate: React.FC<AddOrEditMedicalRecordTemplateProps> = props => {
  // form
  const [form] = Form.useForm()

  // props
  const { common: {
    operationType,
    initNumber,
    medicalRecordInformation: {
      diagnosisList = [],
      currentMedicalHistoryList = [],
      pastHistoryList = [],
      allergyHistoryList = [],
      personalHistoryList = [],
      auxiliaryExaminationList = [],
      treatmentAdviceList = [],
      medicalAdviceList = []
    }
  } } = props

  // useState
  const [callTableModalVisible, setCallTableModalVisible] = useState(false) // 调用列表的显隐
  const [currentCallTableInfo, setCurrentCallTableInfo] = useState<{
    /** 当前点击表单项的name */
    name: string,
    /** 当前点击表单项的label */
    title: string,
    /** 当前点击表当项显示的modal所需数据源 */
    data: { [key: string]: any }[]
  }>({ name: '', title: '', data: [] }) // 当前点击input的搜索按钮的相关数据
  const [saveLoading, setSaveLoading] = useState(false) // 保存按钮的加载状态

  // useRef
  const callInputFormItemsId = useRef<{ [key: string]: any }>({}) // 表单项调用CallTableModal的ID集合，用于传递给后端

  // 为新增时，自动填充编号
  useEffect(() => {
    if (operationType === 'add') {
      form.setFieldsValue({ number: initNumber })
    }
  }, [initNumber, operationType])

  /**
   * 点击input框后的搜索图标的回调函数
   * @param name 表单项的name
   */
  const onClickSearchIcon = (name: string, label: string) => {
    const title = label
    let data: { [key: string]: any }[] = []
    switch (name) {
      case 'currentMedicalHistory':
        data = currentMedicalHistoryList
        break;

      case 'pastHistory':
        data = pastHistoryList
        break;

      case 'allergyHistory':
        data = allergyHistoryList
        break;

      case 'personalHistory':
      case 'familyHistory':
        data = personalHistoryList
        break;

      case 'auxiliaryExamination':
        data = auxiliaryExaminationList
        break;

      case 'treatmentAdvice':
        data = treatmentAdviceList
        break;

      default:
        break;
    }
    // 更新当前选中的表单项信息
    setCurrentCallTableInfo({ name, title, data })
    setCallTableModalVisible(true)
  }

  /**
   * CallTableModal确认调用的回调
   */
  const doOk = (id: number, value: string) => {
    setCallTableModalVisible(false)
    console.log('doOk', id, value)
    // 将选中的ID存储，
    callInputFormItemsId.current[currentCallTableInfo.name] = id
    // 表单项数据填充
    let fieldValue: { [key: string]: any } = {}
    fieldValue[currentCallTableInfo.name] = value
    form.setFieldsValue(fieldValue)
    console.log('callInputFormItemsId', callInputFormItemsId.current)
  }

  /**
   * 转化数据：将表单收集的数据转换为后端接口所需数据格式
   * @param values 
   */
  const doParseValue = (values: Store) => {
    return {
      ...values,
      ...callInputFormItemsId.current,
      diagnosis: values.diagnosis && values.diagnosis.join(' '),
      medicalAdvice: values.medicalAdvice && values.medicalAdvice.join(' '),
    }
  }

  const onFinish = (values: Store) => {
    console.log('onFinish', values)
    setSaveLoading(true)

    let promise

    if (operationType === 'add') {
      promise = request('/medicalRecordTemplates/add', {
        method: 'POST',
        data: doParseValue(values)
      })
    }

    promise && promise.then((res) => {
      console.log('res', res)
      setSaveLoading(false)
      if (res.code === '1') {
        message.success('保存成功！')
        history.push('/system-settings/template-maintenance')
      }
    })
  }

  const callTableModalProps = {
    visible: callTableModalVisible,
    title: currentCallTableInfo.title,
    data: currentCallTableInfo.data,
    doOk,
    doCancel: () => { setCallTableModalVisible(false) }
  }

  return <Form
    layout="vertical"
    form={form}
    initialValues={{
      type: TEMPLATES_TYPES[0].value,
      authority: TEMPLATES_AUTHORITIES[0].value,
      creator: '顾兰兰', // TODO: 当前登录用户
      createdTime: moment().format('YYYY-MM-DD')
    }}
    onFinish={onFinish}
  >
    <Card
      className="card-no-border"
      title={<IconTitle title={`${operationType === 'add' ? '新建' : '编辑'}病历模版`} />}
      extra={<SaveAndGoBackButtons loading={saveLoading} />}
    >
      <div className={styles.basicInfo}>
        <Row gutter={24}>
          <Col {...colProps}>
            <Form.Item label="模版编号" name="number">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="模版名称" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="模版类型" name="type">
              <Radio.Group>
                {TEMPLATES_TYPES.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="模版权限" name="authority">
              <Radio.Group>
                {TEMPLATES_AUTHORITIES.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <Form.Item label="模版说明" name="description">
              <Input />
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="创建人员" name="creator">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="创建时间" name="createdTime">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className={styles.medicalRecordInfo}>
        <span>病历信息</span>
        <span>(病历信息可在系统设置-基础设置中的自定义设置)</span>
      </div>
      <div>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <SelectDropdownFormItem options={diagnosisList} formItemProps={{ label: '诊断', name: 'diagnosis', rules: [{ required: true }] }} />
          </Col>
          <Col {...colProps} lg={12}>
            <Form.Item label="主诉" name="chiefComplaint" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="现病史" name="currentMedicalHistory" onClickSearchIcon={onClickSearchIcon} />
          </Col>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="既往史" name="pastHistory" onClickSearchIcon={onClickSearchIcon} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="过敏史" name="allergyHistory" onClickSearchIcon={onClickSearchIcon} />
          </Col>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="个人史" name="personalHistory" onClickSearchIcon={onClickSearchIcon} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="家族史" name="familyHistory" onClickSearchIcon={onClickSearchIcon} />
          </Col>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="辅助检查" name="auxiliaryExamination" onClickSearchIcon={onClickSearchIcon} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <CallInputFormItem label="治疗意见" name="treatmentAdvice" onClickSearchIcon={onClickSearchIcon} />
          </Col>
          <Col {...colProps} lg={12}>
            <SelectDropdownFormItem options={medicalAdviceList} formItemProps={{ label: '医嘱', name: 'medicalAdvice' }} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colProps} lg={12}>
            <Form.Item label="备注" name="note">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <CallTableModal  {...callTableModalProps} />
    </Card>
  </Form>
}

export default connect(({ common }: {
  common: CommonState
}) => ({ common }))(AddOrEditMedicalRecordTemplate)