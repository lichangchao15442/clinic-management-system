import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

interface DeleteConfirmModalProps {
  /** modal的显隐 */
  visible: boolean;
  /** 描述内容 */
  content: string;
  /** 点击确认按钮的回调函数 */
  onOk: () => void;
  /** 点击取消按钮的回调函数 */
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ visible, content, onOk, onCancel }) => {
  return <Modal
    className="modal-no-border"
    title="删除确认"
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    <ExclamationCircleFilled style={{ color: '#f9d26e', fontSize: 20, marginRight: 20 }} />
    <span>{content}</span>
  </Modal>
}

export default DeleteConfirmModal