import { ReactNode } from 'react';
import { ColumnType, TableProps } from 'antd/es/table';
import { FormItemProps } from 'antd/es/form/FormItem';
import { Dispatch, Loading } from 'umi';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { Store } from 'antd/lib/form/interface';

export interface ITableColumn<T = unknown> extends Omit<ColumnType<T>, ''> {
  /** 在表格中隐藏该控件 */
  hideInTable?: boolean;
  /** 搜索控件类型 */
  searchType?: 'input' | 'select' | 'date' | 'dateRange' | boolean;
  /** 搜索控件排序 */
  searchOrder?: number;
  /** 搜索控件初始值 */
  initialValue?: any;
  /** 搜索控件枚举数据 */
  searchEnum?: { label: any; value: any; [key: string]: any }[] | any;
  /** 搜索枚举字段配置（针对select组件 */
  searchEnumConfig?: {
    /** 显示字段名（默认为label） */
    labelField?: string;
    /** 绑定值字段名（默认为value） */
    valueField?: string;
    /** 是否可模糊查询（默认否） */
    isFilter?: boolean;
    /** 是否显示全部（默认是） */
    showAll?: boolean;
  };
  /** 搜索表单项props */
  formItemProps?: FormItemProps;
  /** 搜索表单项控件props */
  formItemWidgetProps?: { [key: string]: any };
  /** 自定义搜索formItem  */
  renderFormItem?: ReactNode;
}

export interface ITable<T> extends Omit<TableProps<T>, 'loading'> {
  /** 时间戳（用于请求数据） */
  timestamp?: number;
  /** model层effects */
  dispatchType: string;
  /** 列配置 */
  columns: ITableColumn<T>[];
  dispatch: Dispatch;
  loading?: Loading;
  /** 是否显示序号（默认显示） */
  showSerialNumber?: boolean;
  /** 分页配置 */
  pagination?: TablePaginationConfig;
  /** 搜索按钮的配置 */
  searchConfig?: {
    /** 显隐 */
    visible?: boolean;
    /** 文字 */
    text?: string;
    /** 额外的查询参数 */
    extraQueryParams?: { [key: string]: any };
    /** 转换搜索数据 */
    onTransformValues?: (values: Store) => { [key: string]: any };
  };
  /** 重置按钮的配置 */
  resetConfig?: {
    /** 显隐 */
    visible?: boolean;
    /** 文字 */
    text: string;
  };
  /** 额外的组件 */
  extra?: ReactNode;
}
