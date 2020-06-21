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

export async function fetchCheckProjectDetail(params: { id: number }) {
  return request('/getCheckProjectDetail', {
    method: 'GET',
    params,
  });
}
