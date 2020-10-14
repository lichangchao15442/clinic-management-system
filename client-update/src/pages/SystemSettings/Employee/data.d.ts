/** 员工数据类型 */
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
  idNumber: string;
  /** 职称 */
  jobTitle: string;
  /** 所属诊所 */
  ownClinic: string;
  password: string;
  phone: string;
  role: string;
  status: 0 | 1;
}

/** 科室数据类型 */
export interface DepartmentType {
  id: number;
  name: string;
  number: number;
  status: 0 | 1;
  createdTime: string;
  creator: string;
  /** 科室简介 */
  introduction: string;
}

/** 角色数据类型 */
export interface RoleType {
  id: number;
  number: number;
  name: string;
  description: string;
  createdTime: string;
  creator: string;
  /** 1:启用，0:禁用 */
  status: 0 | 1;
}

export interface EmployeeManagementState {
  list: EmployeeType[] | DepartmentType[] | RoleType[];
  total: 0;
  departmentList: DepartmentType[];
  roleList: RoleType[];
  employeeDetail: EmployeeType | {};
  /**  当前选中列表的名字 */
  currentListName: 'employee' | 'department' | 'role';
  departmentDetail: DepartmentType | {};
  roleDetail: RoleType | {};
}
