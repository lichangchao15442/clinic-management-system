import request from '@/utils/request';

export async function fetchEmployeeList(params: {
  pageNum: number;
  pageSize: number;
  query: {
    search?: string;
  };
}) {
  return request('/getEmployeeList', {
    method: 'GET',
    params,
  });
}

export async function fetchDepartmentList(params: {
  pageNum: number;
  pageSize: number;
  query: {
    search?: string;
  };
}) {
  return request('/getDepartmentList', {
    method: 'GET',
    params,
  });
}

export async function fetchRoleList(params: {
  pageNum: number;
  pageSize: number;
  query: {
    search?: string;
  };
}) {
  return request('/getRoleList', {
    method: 'GET',
    params,
  });
}

export async function fetchAllDepartmentList(params: {}) {
  return request('/getAllDepartmentList', {
    method: 'GET',
    params,
  });
}
