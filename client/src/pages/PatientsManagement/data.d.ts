import { Moment } from 'moment';

// 患者数据类型
interface PatientType {
  admissionStatus: number; // 接诊状态
  age: number;
  avatar: string;
  createdTime: string;
  department: number; // 科室
  doctorName: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
  vipLevel: number; // VIP等级
  number: number; // 患者编号
  operator: string; // 操作者
}

// 查询患者参数数据类型
export interface PatientListQueryType {
  vipLevel?: number;
  createdTime?: [Moment, Moment];
  search?: string;
}

export interface PatientsManagementStateType {
  patientList: PatientType[];
  total: number;
}
