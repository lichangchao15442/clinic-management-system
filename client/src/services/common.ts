import request from '@/utils/request';

export async function getInitNumber(params: { name: string }) {
  return request('/getInitNumber', {
    method: 'GET',
    params,
  });
}
