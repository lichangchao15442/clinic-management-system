import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { Radio } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/lib/radio';
import _ from 'lodash';
import { Store } from 'antd/lib/form/interface';

import { GlobalTable } from '@/components'
import { ITableColumn } from '@/components/GlobalTable/data';
import { handleTrim } from '@/utils/util';
import { ORDER_STATUSES, DEPARTMENTS, CHARGE_STATUSES, PAYMENT_METHODS } from '../dataDictionary';
import { ChargeManagementStateType, OrderListType } from '../data';
import styles from './index.less';

// table的columns
const basicColumns: ITableColumn<AnyObject>[] = [
  {
    dataIndex: 'number',
    title: '订单编号',
    align: 'center',
    searchType: 'input',
    searchOrder: 2
  },
  {
    dataIndex: 'type',
    title: '订单类型',
    align: 'center',
    render: (type: number) => <span>{ORDER_STATUSES.find(item => item.value === type)?.label}</span>,
    searchType: 'select',
    searchEnum: ORDER_STATUSES,
    searchOrder: 0
  },
  {
    dataIndex: 'name',
    title: '姓名',
    align: 'center',
    searchType: 'input',
    formItemProps: { label: '患者姓名' },
    searchOrder: 3
  },
  {
    dataIndex: 'age',
    title: '年龄',
    align: 'center'
  },
  {
    dataIndex: 'phone',
    title: '手机号',
    align: 'center'
  },
  {
    dataIndex: 'department',
    title: '科室',
    align: 'center',
    render: (department: number) => <span>{DEPARTMENTS.find(item => item.value === department)?.label}</span>
  },
  {
    dataIndex: 'doctorName',
    title: '接诊医生',
    align: 'center'
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    align: 'center',
    render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
    searchType: 'dateRange',
    searchOrder: 1
  },
];

interface ChargeManagementProps {
  charge: ChargeManagementStateType;
};

const ChargeManagement: React.FC<ChargeManagementProps> = props => {
  // props 
  const { charge } = props;
  const { orderList, total } = charge;

  // useState
  const [curChargeStatus, setCurChargeStatus] = useState(1); // 当前收费状态
  const [curColumns, setCurColumns] = useState(basicColumns); // 当前columns
  const [timestamp, setTimestamp] = useState(0);

  /** 根据收费状态不同，处理columns的不同 */
  useEffect(() => {
    let columns: any[] = _.cloneDeep(basicColumns);
    let ownColumns: any[];
    switch (curChargeStatus) {
      case 1:
        ownColumns = [
          {
            dataIndex: 'amountReceivable',
            title: '应收金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'chargeStatus',
            title: '收费状态',
            align: 'center',
            render: (chargeStatus: number) => {
              const chargeStatusItem = CHARGE_STATUSES.find(item => item.value === chargeStatus)
              return <span style={{ color: chargeStatusItem?.color }}> {chargeStatusItem?.label}</span >
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (record: OrderListType) => <div className="table-operate" style={{ width: 100 }}>
              <div>收费</div>
              <div>编辑</div>
              <div>删除</div>
            </div>
          }
        ];
        break;
      case 2:
        ownColumns = [
          {
            dataIndex: 'amountReceivable',
            title: '应收金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'amountReceived',
            title: '实收金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'paymentMethod',
            title: '支付方式',
            align: 'center',
            render: (paymentMethod: number) => <span>{PAYMENT_METHODS.find(item => item.value === paymentMethod)?.label}</span>
          },
          {
            dataIndex: 'chargeStatus',
            title: '收费状态',
            align: 'center',
            render: (chargeStatus: number) => {
              const chargeStatusItem = CHARGE_STATUSES.find(item => item.value === chargeStatus)
              return <span style={{ color: chargeStatusItem?.color }}> {chargeStatusItem?.label}</span >
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (record: OrderListType) => <div className="table-operate" style={{ width: 80 }}>
              <div>查看</div>
              <div>退费</div>
            </div>
          }
        ];
        break;
      case 3:
        ownColumns = [
          {
            dataIndex: 'amountRefund',
            title: '退费金额（元）',
            align: 'center'
          },
          {
            dataIndex: 'refundMethod',
            title: '退费方式',
            align: 'center',
            render: (paymentMethod: number) => <span>{PAYMENT_METHODS.find(item => item.value === paymentMethod)?.label}</span>
          },
          {
            dataIndex: 'chargeStatus',
            title: '收费状态',
            align: 'center',
            render: (chargeStatus: number) => {
              const chargeStatusItem = CHARGE_STATUSES.find(item => item.value === chargeStatus)
              return <span style={{ color: chargeStatusItem?.color }}> {chargeStatusItem?.label}</span >
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (record: OrderListType) => <div className="table-operate" style={{ width: 'unset' }}>
              <div>查看</div>
            </div>
          }
        ];
        break;
      default:
        ownColumns = []
        break;
    }
    columns.push(...ownColumns);

    setCurColumns(columns);
  }, [curChargeStatus])

  /** Radio.Group选项变化时的回调函数 */
  const onChange = (e: RadioChangeEvent) => {
    setCurChargeStatus(e.target.value);
    setTimestamp(new Date().getTime());
  };

  const onTransformValues = (values: Store) => {
    return handleTrim(['number', 'name'], values);
  };

  return <PageHeaderWrapper>
    <div className="global-container">
      <div className={styles.radioGroup} >
        <Radio.Group
          defaultValue={CHARGE_STATUSES[0].value}
          buttonStyle="solid"
          onChange={onChange}
        >
          {CHARGE_STATUSES.map(item => <Radio.Button
            style={{ width: 100, textAlign: "center" }}
            key={item.value}
            value={item.value}
          >{item.label}</Radio.Button>)}
        </Radio.Group>
      </div>
      <GlobalTable
        dispatchType="charge/fetchOrderList"
        rowKey="number"
        columns={curColumns}
        dataSource={orderList}
        searchConfig={{ extraQueryParams: { chargeStatus: curChargeStatus }, onTransformValues }}
        pagination={{ total }}
        scroll={{ x: 1300 }}
        timestamp={timestamp}
      />
    </div>
  </PageHeaderWrapper>
}

export default connect(({ charge }: {
  charge: ChargeManagementStateType
}) => ({ charge }))(ChargeManagement)