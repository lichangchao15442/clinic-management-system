import request from '@/utils/request';

export async function fetchOrderList(params: any) {
  return request('/getOrderList', {
    method: 'GET',
    params,
  });
}
