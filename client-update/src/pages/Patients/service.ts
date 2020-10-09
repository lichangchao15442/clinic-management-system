import request from '@/utils/request';

import { PatientListQueryType } from './data';

export async function fetchPatientList(params: PatientListQueryType) {
  return request('/getPatientList', {
    method: 'GET',
    params,
  });
}
