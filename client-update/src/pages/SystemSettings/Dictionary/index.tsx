import React, { useState, useEffect, useRef } from 'react';
import { Radio, Button, message, Row, Col, Card } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import _ from 'lodash';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { PlusCircleFilled } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'rc-field-form/lib/interface';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { GlobalTable } from '@/components';
import { DICTIONARY_TYPES } from './dataDictionary';
import { AnyObject, FormItemType } from 'typings';
import { DeleteConfirmModal } from '@/components';
import { ITableColumn } from '@/components/GlobalTable/data.d';
import { getLoginUserName } from '@/utils/util';
import { ownParams, OwnParamType } from './utils/dataDictionary';
import { DictionaryTableMaintenanceState, DictionaryType } from './data';
import { AddOrEditModal } from './components'
import styles from './index.less';

interface DictionaryTableMaintenanceProps {
  dictionary: DictionaryTableMaintenanceState;
  dispatch: Dispatch;
};

const DictionaryTableMaintenance: React.FC<DictionaryTableMaintenanceProps> = props => {
  // props
  const { dictionary: { dictionaryList, total }, dispatch } = props;

  // useStatus
  const [dictionaryType, setDictionaryType] = useState(DICTIONARY_TYPES[0].value);
  const [subDictionaryType, setSubDictionaryType] = useState(DICTIONARY_TYPES[0].subTypes[0].value);
  const [columns, setColumns] = useState<any[]>([]); // 当前选中的table的columns
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑的modal的可见性
  const [modalProps, setModalProps] = useState<{ title: string; formItems: FormItemType[] }>({ title: ownParams[0].name || '', formItems: ownParams[0].modalFormItems || [] }); // modal的数据，包括标题的表单项集合
  const [modalType, setModalType] = useState<'add' | 'edit'>('add'); // modal的操作类型
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false); // 删除确认框的显隐
  const [timestamp, setTimestamp] = useState(0);

  // useRef
  const modalForm = useRef<FormInstance>(); // modal的form
  const currentDictionaryId = useRef<number>(); // 当前操作的数据的ID

  /** 得到modal的form */
  const getForm = (form: FormInstance) => {
    modalForm.current = form;
  };

  /** 增加字典数据 */
  const onAddDictionary = () => {
    // 改变modal的操作类型为add
    setModalType('add');
    // 显示modal
    setModalVisible(true);
  };

  /** 删除某条数字典表数据 */
  const fetchRemoveDictionary = () => {
    dispatch({
      type: 'dictionary/removeDictionary',
      payload: { id: currentDictionaryId.current },
      callback: () => {
        // 操作成功提示
        message.success('提交成功！');
        // 隐藏删除确认框
        setDeleteConfirmModalVisible(false);
        // 刷新列表
        setTimestamp(new Date().getTime());
      }
    });
  };

  /** 显示删除确认框 */
  const onRemoveDictionary = (id: number) => {
    setDeleteConfirmModalVisible(true);
    currentDictionaryId.current = id;
  };

  /** 编辑某条字典表数据 */
  const onEditDictionary = (record: DictionaryType) => {
    // 将编辑的数据保存ID，用于传递给后台
    currentDictionaryId.current = record.id;
    // 改变当前modal操作类型为edit
    setModalType('edit');
    // 显示modal
    setModalVisible(true);
    // 给modal中的表单赋值
    modalForm.current?.setFieldsValue(record);
  };

  // 公共列名
  const basicColumns: ITableColumn<AnyObject>[] = [
    {
      dataIndex: 'key',
      title: '序号',
      align: 'center'
    },
    {
      dataIndex: 'createdTime',
      title: '创建时间',
      align: 'center',
      render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      dataIndex: 'creator',
      title: '创建人',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render: (record: DictionaryType) => <div>
        <Button type="link" onClick={() => { onEditDictionary(record) }}>编辑</Button>
        <Button type="link" onClick={() => { onRemoveDictionary(record.id) }}>删除</Button>
      </div>,
      fixed: 'right'
    }
  ];

  /** 类型不同，参数不同 */
  useEffect(() => {
    const newColumns = _.cloneDeep(basicColumns);
    // 需保证ownColumns中类型值与数据字典中的类型之保持一致！！！
    const ownParam: OwnParamType | undefined = ownParams.find(item => {
      return item.dictionaryType === dictionaryType && item.subDictionaryType === subDictionaryType;
    });
    if (ownParam) {
      // columns不同
      newColumns.splice(1, 0, ...ownParam.columns);
      setColumns(newColumns);
      // modalProps不同
      setModalProps({
        title: ownParam.modalTitel,
        formItems: ownParam.modalFormItems || []
      });
    }
  }, [dictionaryType, subDictionaryType]);

  /** 一级tab Radio.Group选项变化时的回调函数 */
  const onTitleChange = (e: RadioChangeEvent) => {
    // 切换一级菜单，二级菜单从回到第一个
    setDictionaryType(e.target.value);
    setSubDictionaryType(1);
    setTimestamp(new Date().getTime());
  };

  /** 二级tab Radio.Group选项变化时的回调函数 */
  const onSubTitleChange = (e: RadioChangeEvent) => {
    setSubDictionaryType(e.target.value);
    setTimestamp(new Date().getTime());
  };

  /** 点击新增/编辑-modal确定按钮触发的回调 */
  const doOk = (values: Store) => {
    const payload: AnyObject = {
      dictionaryType,
      subDictionaryType,
      ...values,
    };
    let type = '';
    if (modalType === 'add') {
      type = 'dictionary/addDictionary';
      payload.creator = getLoginUserName();
    } else {
      type = 'dictionary/editDictionary';
      payload.id = currentDictionaryId.current;
    };
    dispatch({
      type,
      payload,
      callback: () => {
        // 刷新当前列表
        setTimestamp(new Date().getTime());
        // 隐藏弹出框
        setModalVisible(false)
      }
    });
  };

  /** 点击新增-modal取消按钮触发的回调 */
  const doCancel = () => {
    setModalVisible(false);
  };

  /** 一级tab面板 */
  const title = <Radio.Group
    defaultValue={DICTIONARY_TYPES[0].value}
    buttonStyle="solid"
    onChange={onTitleChange}
  >
    {DICTIONARY_TYPES.map(item => <Radio.Button
      style={{ width: 100, textAlign: "center" }}
      key={item.value}
      value={item.value}
    >{item.label}</Radio.Button>)}
  </Radio.Group>;

  const addOrEditModalprops = {
    visible: modalVisible,
    modalProps,
    doOk,
    doCancel,
    modalType,
    getForm
  };

  const deleteConfirmModalProps = {
    visible: deleteConfirmModalVisible,
    content: '信息删除后无法恢复，确定删除吗？',
    onOk: fetchRemoveDictionary,
    onCancel: () => { setDeleteConfirmModalVisible(false) }
  };

  return <PageHeaderWrapper>
    <div className="global-container">
      <Card title={title} extra={<div>
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={onAddDictionary}
        >新增</Button>
      </div>} >
        <Row gutter={24}>
          <Col span={8}>
            <Radio.Group
              className={styles.radio}
              defaultValue={
                DICTIONARY_TYPES.find(item => item.value === dictionaryType)?.subTypes[0].value
              }
              buttonStyle="solid"
              value={subDictionaryType}
              onChange={onSubTitleChange}
            >
              {DICTIONARY_TYPES.find(item => item.value === dictionaryType)?.subTypes.map(item => <Radio.Button
                className={styles.subTitle}
                key={item.value}
                value={item.value}
              >{item.label}</Radio.Button>)}
            </Radio.Group>
          </Col>
          <Col span={16}>
            <GlobalTable
              rowKey="id"
              dispatchType="dictionary/fetchDictionaryList"
              columns={columns}
              dataSource={dictionaryList}
              pagination={{ total }}
              searchConfig={{ extraQueryParams: { dictionaryType, subDictionaryType } }}
              timestamp={timestamp}
              scroll={{ x: 1000 }}
            />
          </Col>
        </Row>
      </Card>
    </div>
    <AddOrEditModal {...addOrEditModalprops} />
    <DeleteConfirmModal {...deleteConfirmModalProps} />
  </PageHeaderWrapper>
};

export default connect(({ dictionary }: {
  dictionary: DictionaryTableMaintenanceState
}) => ({ dictionary }))(DictionaryTableMaintenance);