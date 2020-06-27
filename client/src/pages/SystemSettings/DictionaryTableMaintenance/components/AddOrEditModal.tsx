import React from 'react'
import { Modal, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'rc-field-form/lib/interface'

import { FormItemType } from '@/typings'


interface AddOrEditModalProps {
  visible: boolean;
  modalProps: { title: string; formItems: FormItemType[] }; // 标题和表单项集合
  modalType: 'add' | 'edit'; // 操作类型
  doOk: (value: Store) => void;
  doCancel: () => void;
  getForm?: (form: FormInstance) => void; // 将form暴露给父组件
}

const AddOrEditModal: React.FC<AddOrEditModalProps> = ({
  visible,
  modalProps: { title, formItems },
  doOk,
  doCancel,
  getForm,
  modalType
}) => {
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form

  // 将form暴露给父组件
  getForm && getForm(form)

  // 退出modal的统一操作
  const doDropOut = () => {
    // 清空表单
    resetFields()
  }

  // 确定按钮的回调函数
  const onOk = () => {
    // 校验并收集form表单
    validateFields().then((values) => {
      doOk(values)
      doDropOut()
    }).catch((err) => {
      console.error(err)
    })
  }

  // 取消按钮的回调函数
  const onCancel = () => {
    doCancel()
    doDropOut()
  }
  return <Modal
    className="modal-no-border"
    title={`${modalType === 'add' ? '新增' : '编辑'}${title}`}
    centered={true}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    <Form form={form}>
      {formItems.map((item: FormItemType) =>
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          rules={[{ required: true, message: "请填写信息" }]}
        >
          {item.component}
        </Form.Item>)}
    </Form>
  </Modal>
}

export default AddOrEditModal