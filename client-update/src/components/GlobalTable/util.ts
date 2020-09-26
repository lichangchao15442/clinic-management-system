/**
 * Select选择框数据过滤
 * @param inputValue 输入的值
 * @param option 所有的选项
 */
export const handleFilterOption = (inputValue: any, option: any) => {
  const bool = option.children.indexOf(inputValue) !== -1;
  return bool;
};