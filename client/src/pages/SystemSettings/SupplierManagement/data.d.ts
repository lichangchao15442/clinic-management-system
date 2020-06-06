// 供应商数据类型
export interface SupplierType {
  id: number;
  name: string;
  number: number;
  phone: string;
  status: 0 | 1; // 0：禁用，1:启用
  contactPerson: string; // 联系人
  createdTime: string;
  creator: string;
  note: string;
}

export interface SupplierManagementState {
  supplierList: SupplierType[];
  total: number;
  supplierNumber: number | null; // 新增供应商时自动填充的供应商编码
  operationType: 'add' | 'edit'; // 新增/编辑供应商共用页面的当前操作类型
}
