import request from '@/utils/request';

export async function getMedicalRecordTemplateList(params: {
  pageNum: number;
  pageSize: number;
  query: { [key: string]: any };
}) {
  return request('/medicalRecordTemplates/list', {
    method: 'GET',
    params,
  });
}
