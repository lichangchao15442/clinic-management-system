import request from '@/utils/request';

export async function fetchPatientList(params: any) {
  return request('/getPatientList', {
    method: 'GET',
    params,
  });
}
