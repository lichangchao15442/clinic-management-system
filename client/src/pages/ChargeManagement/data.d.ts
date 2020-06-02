export interface OrderListType {
  age: number;
  amountReceivable: number; // 应收金额
  amountReceived: number; // 实收金额
  amountRefund: number; // 退费金额
  chargeStatus: number; // 收费状态
  createdTime: string;
  department: number;
  doctorName: string;
  gender: number;
  id: number;
  name: string;
  number: number; // 编号
  phone: string;
  type: number; // 订单状态
  paymentMethod: number; // 支付方式
  refundMethod: number; // 退费方式
}

export interface ChargeManagementStateType {
  orderList: OrderListType[];
  total: number;
}
