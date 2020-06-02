import request from '@/utils/request';

export async function fetchDictionaryList(params: any) {
  return request('/getDictionaryList', {
    method: 'GET',
    params,
  });
}
