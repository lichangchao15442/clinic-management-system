// 检查项目数据类型
export interface CheckProjectType {
  id: number;
  number: number; // 编号
  name: string; // 项目名称
  type: string; // 项目类别
  unit: string; // 项目单位
  costPrice: string; // 成本价
  retailPrice: string; // 零售价
  createdTime: string;
  invoiceItems: string; // 发票项目
  isAllowMemberDiscount: boolean; // 是否允许会员折扣
  status: 0 | 1; // 项目状态
  note?: string; // 备注
  part?: string; // 部位
}

export interface CheckProjectSettingStateType {
  checkProjectList: CheckProjectType[];
  total: number;
}
