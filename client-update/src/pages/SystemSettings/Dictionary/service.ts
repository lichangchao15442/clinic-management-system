import request from '@/utils/request';

/** 获取数据字典列表 */
export async function fetchDictionaryList(params: {
  pageSize: number;
  pageNum: number;
  query: {
    type?: number;
    search?: string;
  };
}) {
  return request('/getDictionaryList', {
    method: 'GET',
    params,
  });
}

/** 删除某条数据字典数据 */
export const removeDictionary = async (data: { id: string }) =>
  request('/deleteDictionary', {
    method: 'DELETE',
    data,
  });

/** 新增一条数据字典数据 */
export const addDictionary = async (data: {
  /** 一级类型 */
  dictionaryType: number;
  /** 二级类型 */
  subDictionaryType: number;
  /** 操作人 */
  creator: string;
  /** 名称 */
  name: string;
  /** 类型 */
  type?: number;
}) =>
  request('/addDictionary', {
    method: 'POST',
    data,
  });

/** 编辑某条数据字典数据 */
export const editDictionary = async (data: {
  /** 一级类型 */
  dictionaryType: number;
  /** 二级类型 */
  subDictionaryType: number;
  /** id */
  id: string;
  /** 名称 */
  name: string;
  /** 类型 */
  type?: number;
}) =>
  request('/updateDictionary', {
    method: 'POST',
    data,
  });
