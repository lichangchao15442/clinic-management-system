import { ReactNode } from 'react';
import { ColumnType } from 'antd/es/table';
import { FormItemProps } from 'antd/es/form/FormItem';

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
