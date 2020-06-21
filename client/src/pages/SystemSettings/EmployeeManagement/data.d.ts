// 员工数据类型
export interface EmployeeType {
  id: number;
  name: string;
  number: number;
  address: string;
  addressDetail: string;
  age: number;
  ageUnit: number;
  createdTime: string;
  creator: string;
  department: string;
  email: string;
  gender: number;
  idNumber: string; // 证件号码
  jobTitle: string; // 职称
  ownClinic: string; // 所属诊所
  password: string;
  phone: string;
  role: string;
  status: 0 | 1;
}

// 科室数据类型
export interface DepartmentType {
  id: number;
  name: string;
  number: number;
  status: 0 | 1;
  createdTime: string;
  creator: string;
  introduction: string; // 科室简介
}

// 角色数据类型
export interface RoleType {
  id: number;
  number: number;
  name: string;
  description: string;
  createdTime: string;
  creator: string;
  status: 0 | 1; // 1:启用，0:禁用
}

export interface EmployeeManagementState {
  list: EmployeeType[] | DepartmentType[] | RoleType[];
  total: 0;
  departmentList: DepartmentType[];
  operationType: 'add' | 'edit'; // 新增/编辑共用页面的当前操作类型
  roleList: RoleType[];
  employeeDetail: EmployeeType | {};
}
