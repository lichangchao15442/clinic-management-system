
// 病历模版数据类型
interface MedicalRecordTemplateType {
  id: number;
  number: string;
  name: string;
  /** 诊断（列表为string，表单为number[]） */
  diagnosis: string | number[];
  /** 模版权限 */
  authority: 1 | 2;
  createdTime: string;
  creator: string;
  description: string;
  /** 过敏史 */
  allergyHistory: number;
  /** 辅助检查 */
  auxiliaryExamination: number;
  /** 主诉 */
  chiefComplaint: string;
  /** 现病史 */
  currentMedicalHistory: number;
  /** 既往史 */
  pastHistory: number;
  /** 个人史 */
  personalHistory: number;
  /** 家族史 */
  familyHistory: number;
  /** 医嘱 */
  medicalAdvice: number[];
  /** 治疗意见 */
  treatmentAdvice: number;
  note: string;
}

export interface TemplateMaintenanceState {
  medicalRecordTemplateList: MedicalRecordTemplateType[];
  total: number;
}