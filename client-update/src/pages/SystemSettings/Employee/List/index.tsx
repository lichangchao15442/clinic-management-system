import React, { useState, useEffect, useRef } from 'react'
import { Radio, Switch, Button, Select, message, Card } from 'antd';
import { connect, history, Dispatch } from 'umi'
import moment from 'moment'
import { RadioChangeEvent } from 'antd/lib/radio'
import { PlusCircleFilled } from '@ant-design/icons'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { DeleteConfirmModal, GlobalTable } from '@/components'
import { ITableColumn } from '@/components/GlobalTable/data.d';
import request from '@/utils/request'
import { AnyObject, FormItemType } from 'typings'
import { EmployeeManagementState, EmployeeType, DepartmentType, RoleType } from '../data'

const { Option } = Select

interface CurrentBasicDataType {
  label: string;
  key: string;
  dispatchType: string;
  searchPlaceholder: string;
  addPath: string; // 点击新增跳转的页面
  columns: ITableColumn<AnyObject>[];
  filterFormItems?: FormItemType[];
}

interface EmployeeManagementProps {
  employee: EmployeeManagementState;
  dispatch: Dispatch;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = props => {
  // props
  const { employee: { list, total, departmentList, currentListName }, dispatch } = props

  // 单独tab的数据
  const radios: CurrentBasicDataType[] = [
    {
      label: '员工列表',
      key: 'employee',
      dispatchType: 'employee/fetchEmployeeList',
      searchPlaceholder: '员工姓名',
      addPath: '/system-settings/employee/add-employee',
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
          render: (status: number, record: EmployeeType) => <Switch checked={status === 1} onClick={(checked) => onChangeStatus('employee', checked, record.id)} />
        },
        {
          title: '操作',
          align: 'center',
          render: (record: EmployeeType) => <div>
            <Button type="link" onClick={() => { history.push(`/system-settings/employee/edit-employee?id=${record.id}`) }}>编辑</Button>
            <Button type="link" onClick={() => { onRemove('employee', record.id) }}>删除</Button>
          </div>,
          fixed: 'right'
        }
      ],
      filterFormItems: [
        {
          label: '所属科室',
          name: 'department',
          component: <Select style={{ width: 100 }} placeholder="请选择" allowClear={true}>
            {departmentList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
        }
      ]
    },
    {
      label: '科室列表',
      key: 'department',
      dispatchType: 'employee/fetchDepartmentList',
      searchPlaceholder: '科室名称',
      addPath: '/system-settings/employee/add-department',
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
          render: (status: number, record: DepartmentType) => <Switch checked={status === 1} onClick={(checked) => onChangeStatus('department', checked, record.id)} />
        },
        {
          title: '操作',
          align: 'center',
          render: (record: DepartmentType) => <div>
            <Button type="link" onClick={() => { history.push(`/system-settings/employee/edit-department?id=${record.id}`) }}>编辑</Button>
            <Button type="link" onClick={() => { onRemove('department', record.id) }}>删除</Button>
          </div>,
          fixed: 'right'
        }
      ]
    },
    {
      label: '角色列表',
      key: 'role',
      dispatchType: 'employee/fetchRoleList',
      searchPlaceholder: '角色名称',
      addPath: '/system-settings/employee/add-role',
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
          render: (status: number, record: RoleType) => <Switch checked={status === 1} onClick={(checked) => { onChangeStatus('role', checked, record.id) }} />
        },
        {
          title: '操作',
          align: 'center',
          render: (record: RoleType) => <div>
            <Button type="link" onClick={() => { history.push(`/system-settings/employee/edit-role?id=${record.id}`) }}>编辑</Button>
            <Button type="link" onClick={() => { onRemove('role', record.id) }}>删除</Button>
          </div>,
          fixed: 'right'
        }
      ]
    }
  ]

  // useState
  const [currentBasicData, setCurrentBasicData] = useState<CurrentBasicDataType>(radios[0]) // 当前选中面板的基础信息
  const [isRefresh, setIsRefresh] = useState(false) // 刷新列表页面的开关
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false) // 确认删除弹出框的显隐
  const [timestamp, setTimestamp] = useState(0);

  // useRef
  const currentConfirmData = useRef({ type: '', id: 0, content: '' }) // 当前删除数据的类型和确认删除框的内容

  useEffect(() => {
    // 改变当前选中的列表的数据
    const radioData = radios.find(item => item.key === currentListName)
    radioData && setCurrentBasicData(radioData)
    setTimestamp(new Date().getTime());
  }, [currentListName])

  /**
   * 统一调用删除接口的处理
   */
  const doRemove = () => {
    const { type, id } = currentConfirmData.current
    let url = ''
    let label = ''
    switch (type) {
      case 'employee':
        url = '/deleteEmployee'
        label = '员工'
        break;

      case 'department':
        url = '/deleteDepartment'
        label = '科室'
        break;

      case 'role':
        url = '/deleteRole'
        label = '角色'
        break;

      default:
        break;
    }
    const promise = request(url, {
      method: 'DELETE',
      data: { id }
    })
    promise.then((res) => {
      if (res.code === '1') {
        // 操作成功提示
        message.success(`${label}删除成功！`)
        // 删除确认框隐藏
        setDeleteConfirmModalVisible(false)
        // 刷新当前列表
        setIsRefresh(isRefresh => !isRefresh)
      }
    })
  }

  /**
   * 统一的删除功能(开启确认删除弹出框并根据删除的数据类别设置不同的内容)
   * @param name 删除数据所属分类的名字
   * @param id 删除数据的ID
   */
  const onRemove = (name: string, id: number) => {
    setDeleteConfirmModalVisible(true)

    let content = ''
    switch (name) {
      case 'employee':
        content = '删除后无法恢复，确定要删除此员工信息吗？'
        break;
      case 'department':
        content = '科室正在使用，确定要删除此科室吗？'
        break;
      case 'role':
        content = '角色正在使用，确定要删除此角色吗？'
        break;

      default:
        break;
    }
    currentConfirmData.current = { type: name, id, content }
  }

  /**
   * 统一的改变状态功能
   * @param name 改变状态的数据所在分类的名字
   * @param status 将要改变的状态
   * @param id 该条数据的ID
   */
  const onChangeStatus = (name: string, status: boolean, id: number) => {
    let url = ''
    let label = ''
    switch (name) {
      case 'employee':
        url = '/updateEmployee'
        label = '员工'
        break;

      case 'department':
        url = '/updateDepartment'
        label = '科室'
        break;

      case 'role':
        url = '/updateRole'
        label = '角色'
        break;

      default:
        break;
    }
    const promise = request(url, {
      method: 'POST',
      data: {
        id,
        status
      }
    })
    promise.then((res) => {
      if (res.code === '1') {
        message.success(`${label}${status ? '启用' : '停用'}成功`)
        setIsRefresh(isRefresh => !isRefresh)
      }
    })
  }


  /** 选项变化时的回调 */
  const onChange = (e: RadioChangeEvent) => {
    // 改变当前选中列表的值
    dispatch({
      type: 'employee/save',
      payload: {
        currentListName: e.target.value
      }
    });
  };

  // const extra =

  const deleteConfirmModalProps = {
    visible: deleteConfirmModalVisible,
    content: currentConfirmData.current.content,
    onOk: doRemove,
    onCancel: () => { setDeleteConfirmModalVisible(false) }
  }
  return <PageHeaderWrapper>
    <div className="global-container">
      <Card title={<Radio.Group
        buttonStyle="solid"
        value={currentListName}
        onChange={onChange}
      >
        {radios.map(item => <Radio.Button key={item.key} value={item.key}>{item.label}</Radio.Button>)}
      </Radio.Group>}
        extra={<Button
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => { history.push(currentBasicData.addPath) }}
        >新增</Button>}
      >
        <GlobalTable
          rowKey="number"
          dispatchType={currentBasicData.dispatchType}
          dataSource={list}
          columns={currentBasicData.columns}
          pagination={{ total }}
          scroll={{ x: 2000 }}
          timestamp={timestamp}
        // searchConfig={{extraQueryParams:{}}}
        />
      </Card>
    </div>
    <DeleteConfirmModal {...deleteConfirmModalProps} />
  </PageHeaderWrapper>
}

export default connect(({ employee }: {
  employee: EmployeeManagementState
}) => ({ employee }))(EmployeeManagement)