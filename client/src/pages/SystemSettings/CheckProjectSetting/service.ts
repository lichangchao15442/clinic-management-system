import request from '@/utils/request';

export async function fetchCheckProjectList(params: {
  pageNum: number;
  pageSize: number;
  query: {
    search?: string;
    status?: number;
  };
}) {
  return request('/getCheckProjectList', {
    method: 'GET',
    params,
  });
}
