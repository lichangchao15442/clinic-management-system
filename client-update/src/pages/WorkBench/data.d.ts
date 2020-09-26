import { Moment } from 'moment';

/** 患者数据类型 */
interface PatientType {
  /** 接诊状态 */
  admissionStatus: number;
  age: number;
  avatar: string;
  createdTime: string;
  /** 科室 */
  department: number;
  doctorName: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
  /** VIP等级 */
  vipLevel: number;
}

/** 患者查询的条件 */
export interface PatientListQueryType {
  createdTime?: [Moment, Moment];
  admissionStatus?: number;
  search?: string;
}

export interface WorkBenchModalStateType {
  patientList: PatientType[];
  total: number;
}
