import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Modal } from 'antd'
import moment from 'moment'

import { DictionaryType } from '@/pages/SystemSettings/DictionaryTableMaintenance/data'
import styles from './index.less'

interface CallTableModalProps {
  visible: boolean;
  title: string;
  data: { [key: string]: any }[];
  doOk: (id: number, value: string) => void;
  doCancel: () => void;
}

const CallTableModal: React.FC<CallTableModalProps> = ({ visible, title, data, doOk, doCancel }) => {
  // useState
  const [dataSource, setDataSource] = useState<{ [key: string]: any }[]>([]) // table的数据源

  /** 为数据源增加序号 */
  useEffect(() => {
    // 注意：需要visible作为依赖项。若只有data作为依赖项时，当data不变就不会进入！！！页面就不会有列表！！！
    if (data.length && visible) {
      const newData = data.map((item, index) => ({
        ...item,
        key: index + 1
      }))
      setDataSource(newData)
    }
  }, [data, visible])

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title,
      dataIndex: 'name',
      align: 'center',
      width: 200,
      ellipsis: true
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      align: 'center',
      width: 200,
      render: (createdTime: string) => <span>{moment(createdTime).format('YYYY-MM-DD hh:mm:ss')}</span>
    },
    {
      title: '创建人员',
      dataIndex: 'creator',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (record: DictionaryType) => <Button type="link" onClick={() => { onCall(record) }}>调用</Button>
    },
  ]

  /** 退出modal的统一操作：清空state */
  const dropOut = () => {
    // 延迟清空，防止数据瞬间消失的效果
    setTimeout(() => { setDataSource([]) }, 500)
  }

  /** 点击调用的回调函数 */
  const onCall = (record: DictionaryType) => {
    doOk(record.id, record.name)
    dropOut()
  }

  /** 取消的回调函数 */
  const onCancel = () => {
    doCancel()
    dropOut()
  }
  return <Modal
    className={styles.modal}
    width={1000}
    visible={visible}
    onCancel={onCancel}
  >
    <Card className="card-no-border" title={`调用${title}`}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </Card>
  </Modal>
}

export default CallTableModal