import request from '@/utils/request';

export async function fetchSupplierList(params: {
  pageNum: number;
  pageSize: number;
  query: {
    search?: string;
  };
}) {
  return request('/getSupplierList', {
    method: 'GET',
    params,
  });
}

export async function fetchSupplierNumber() {
  return request('/getSupplierNumber');
}
