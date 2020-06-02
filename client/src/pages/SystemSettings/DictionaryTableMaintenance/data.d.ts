// 数据字典数据结构
export interface DictionaryType {
  id: number;
  name: string;
  createdTime: string;
  creator: string; // 创建人
  dictionaryType: number; // 一级分类
  subDictionaryType: number; // 二级分类
  type?: string; // 该数据的具体类型
}

export interface DictionaryTableMaintenanceState {
  dictionaryList: DictionaryType[];
  total: number;
}
