import React, { useState } from 'react'
import { Radio, Switch, Button, Select } from 'antd'
import { connect, history } from 'umi'
import moment from 'moment'
import { RadioChangeEvent } from 'antd/lib/radio'
import { PlusCircleFilled } from '@ant-design/icons'

import GlobalTable from '@/components/GlobalTable'
import { EmployeeManagementState, EmployeeType, DepartmentType, RoleType } from './data'
import { USE_STATUSES } from '@/utils/dataDictionary'
import { FormItemType } from '@/typings'

const { Option } = Select

interface CurrentBasicDataType {
  label: string;
  key: string;
  dispatchType: string;
  searchPlaceholder: string;
  addPath: string; // 点击新增跳转的页面
  columns: { [key: string]: any }[];
  filterFormItems?: FormItemType[];
}

// TODO: 1. 后台获取员工列表接口的编写；2. 面板切换的功能实现：决定了dispatchType和columns，刷新使用isRefresh


interface EmployeeManagementProps {
  employeeManagement: EmployeeManagementState
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = props => {
  // props
  const { employeeManagement: { list, total, departmentList } } = props

  const radios = [
    {
      label: '员工列表',
      key: 'employee',
      dispatchType: 'employeeManagement/fetchEmployeeList',
      searchPlaceholder: '员工姓名',
      addPath: '/system-settings/employee-management/add-employee',
      columns: [
        {
          dataIndex: 'key',
          title: '序号',
          align: 'center'
        },
        {
          dataIndex: 'number',
          title: '工号',
          align: 'center'
        },
        {
          dataIndex: 'name',
          title: '员工姓名',
          align: 'center'
        },
        {
          dataIndex: 'age',
          title: '员工年龄',
          align: 'center'
        },
        {
          dataIndex: 'phone',
          title: '手机号码',
          align: 'center'
        },
        {
          dataIndex: 'ownClinic',
          title: '所属诊所',
          align: 'center'
        },
        {
          dataIndex: 'department',
          title: '所属科室',
          align: 'center',
        },
        {
          dataIndex: 'role',
          title: '角色',
          align: 'center',
          render: (role: string) => <span>{role && role.split(' ').join(',')}</span>
        },
        {
          dataIndex: 'createdTime',
          title: '创建时间',
          align: 'center',
          render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
          dataIndex: 'creator',
          title: '创建人',
          align: 'center',
        },
        {
          dataIndex: 'status',
          title: '员工状态',
          align: 'center',
          render: (status: number) => <Switch checked={status === 1} />
        },
        {
          title: '操作',
          align: 'center',
          render: (record: EmployeeType) => <div style={{ width: 100 }} className="table-operate">
            <Button type="link" onClick={() => { history.push(`/system-settings/employee-management/edit-employee?id=${record.id}`) }}>编辑</Button>
            <Button type="link">删除</Button>
          </div>
        }
      ],
      filterFormItems: [
        {
          label: '所属科室',
          name: 'depaertment',
          component: <Select style={{ width: 100 }} placeholder="请选择" allowClear={true}>
            {departmentList.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
          </Select>
        }
      ]
    },
    {
      label: '科室列表',
      key: 'department',
      dispatchType: 'employeeManagement/fetchDepartmentList',
      searchPlaceholder: '科室名称',
      addPath: '/system-settings/employee-management/add-department',
      columns: [
        {
          dataIndex: 'key',
          title: '序号',
          align: 'center'
        },
        {
          dataIndex: 'number',
          title: '科室编号',
          align: 'center'
        },
        {
          dataIndex: 'name',
          title: '科室名称',
          align: 'center'
        },
        {
          dataIndex: 'introduction',
          title: '科室简介',
          align: 'center'
        },
        {
          dataIndex: 'createdTime',
          title: '创建时间',
          align: 'center',
          render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
          dataIndex: 'creator',
          title: '创建人员',
          align: 'center',
        },
        {
          dataIndex: 'status',
          title: '科室状态',
          align: 'center',
          render: (status: number) => <Switch checked={status === 1} />
        },
        {
          title: '操作',
          align: 'center',
          render: (record: DepartmentType) => <div style={{ width: 100 }} className="table-operate">
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </div>
        }
      ]
    },
    {
      label: '角色列表',
      key: 'role',
      dispatchType: 'employeeManagement/fetchRoleList',
      searchPlaceholder: '角色名称',
      addPath: '/system-settings/employee-management/add-role',
      columns: [
        {
          dataIndex: 'key',
          title: '序号',
          align: 'center'
        },
        {
          dataIndex: 'number',
          title: '角色编号',
          align: 'center'
        },
        {
          dataIndex: 'name',
          title: '角色名称',
          align: 'center'
        },
        {
          dataIndex: 'description',
          title: '角色描述',
          align: 'center'
        },
        {
          dataIndex: 'createdTime',
          title: '创建时间',
          align: 'center',
          render: (createdTime: string) => <span>{createdTime && moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
          dataIndex: 'creator',
          title: '创建人员',
          align: 'center',
        },
        {
          dataIndex: 'status',
          title: '角色状态',
          align: 'center',
          render: (status: 0 | 1) => <span>{USE_STATUSES.find(item => item.value === status)?.label}</span>
        },
        {
          title: '操作',
          align: 'center',
          render: (record: RoleType) => <div style={{ width: 100 }} className="table-operate">
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </div>
        }
      ]
    }
  ]

  // useState
  const [currentBasicData, setCurrentBasicData] = useState<CurrentBasicDataType>(radios[0])
  const [isRefresh, setIsRefresh] = useState(false)



  // 选项变化时的回调
  const onChange = (e: RadioChangeEvent) => {
    const radioData = radios.find(item => item.key === e.target.value)
    setCurrentBasicData(radioData)
    setIsRefresh(!isRefresh)
  }

  const title = <Radio.Group
    defaultValue={radios[0].key}
    buttonStyle="solid"
    onChange={onChange}
  >
    {radios.map(item => <Radio.Button key={item.key} value={item.key}>{item.label}</Radio.Button>)}
  </Radio.Group>

  const extra = <Button
    type="primary"
    icon={<PlusCircleFilled />}
    onClick={() => { history.push(currentBasicData.addPath) }}
  >新增</Button>

  const globalTableProps = {
    dispatchType: currentBasicData.dispatchType,
    dataSource: list,
    total,
    title,
    columns: currentBasicData.columns,
    searchPlaceholder: currentBasicData.searchPlaceholder,
    isRefresh,
    filterFormItems: currentBasicData.filterFormItems,
    extra
  }
  return <GlobalTable {...globalTableProps} />
}

export default connect(({ employeeManagement }: {
  employeeManagement: EmployeeManagementState
}) => ({ employeeManagement }))(EmployeeManagement)