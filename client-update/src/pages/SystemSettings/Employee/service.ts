import request from '@/utils/request';
import { AnyObject } from 'typings';

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

export async function fetchAllRoleList() {
  return request('/getAllRoleList');
}

export async function fetchEmployeeDetail(params: { id: number }) {
  return request('/getEmployeeDetail', {
    method: 'GET',
    params,
  });
}

export async function fetchDepartmentDetail(params: { id: number }) {
  return request('/getDepartmentDetail', {
    method: 'GET',
    params,
  });
}

export async function fetchRoleDetail(params: { id: number }) {
  return request('/getRoleDetail', {
    method: 'GET',
    params,
  });
}

export const addEmployee = (data: AnyObject) =>
  request('/addEmployee', {
    method: 'POST',
    data,
  });

export const updateEmployee = (data: AnyObject) =>
  request('/updateEmployee', {
    method: 'POST',
    data,
  });

export const deleteEmployee = (data: { id: string }) =>
  request('/deleteEmployee', {
    method: 'DELETE',
    data,
  });

export const addDepartment = (data: AnyObject) =>
  request('/addDepartment', {
    method: 'POST',
    data,
  });

export const updateDepartment = (data: AnyObject) =>
  request('/updateDepartment', {
    method: 'POST',
    data,
  });

export const deleteDepartment = (data: { id: string }) =>
  request('/deleteDepartment', {
    method: 'DELETE',
    data,
  });

export const addRole = (data: { id: string }) =>
  request('/addRole', {
    method: 'POST',
    data,
  });

export const updateRole = (data: { id: string }) =>
  request('/updateRole', {
    method: 'POST',
    data,
  });

export const deleteRole = (data: { id: string }) =>
  request('/deleteRole', {
    method: 'DELETE',
    data,
  });
