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
}

// 患者查询的条件
export interface PatientListQueryType {
  createdTime?: [Moment, Moment];
  admissionStatus?: number;
  search?: string;
}

export interface WorkBenchModalStateType {
  patientList: PatientType[];
  total: number;
}
