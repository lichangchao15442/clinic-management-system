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

export async function fetchUnitList() {
  return request('/getUnitList');
}

export async function fetchProjectTypeList() {
  return request('/getProjectTypeList');
}

export async function fetchInvoiceItemList() {
  return request('/getInvoiceItemList');
}

export async function fetchProjectNumber() {
  return request('/getProjectNumber');
}
