import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, Input, Switch, message } from 'antd';
import { history, connect, Dispatch, Loading } from 'umi';
import moment from 'moment';
import { Store } from 'rc-field-form/lib/interface';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { StyleComponents } from '@/components';
import { CommonState } from '@/models/common';
import { getLoginUserName } from '@/utils/util';
import { EmployeeManagementState } from '../data';

const { IconTitle, SaveAndGoBackButtons, } = StyleComponents;

const colProps = {
  lg: 6,
  md: 12,
  xs: 24
};

interface AddOrEditDepartmentprops {
  employee: EmployeeManagementState;
  common: CommonState;
  location: {
    query: { [key: string]: any }
  };
  dispatch: Dispatch;
  loading: Loading;
};

const AddOrEditDepartment: React.FC<AddOrEditDepartmentprops> = props => {
  // form
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  // props
  const {
    employee: { departmentDetail },
    common: { initNumber, operationType },
    location: { query },
    dispatch,
    loading
  } = props;

  /** 自动填充编号 */
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({
        number: initNumber
      });
    };
  }, [initNumber]);

  /** 当前操作为编辑表单时，回显表单值 */
  useEffect(() => {
    if (operationType === 'edit') {
      setFieldsValue({
        ...departmentDetail,
        createdTime: moment(departmentDetail.createdTime).format('YYYY-MM-DD hh:mm:ss')
      })
    };
  }, [operationType, departmentDetail]);

  /** 提交表单且通过校验触发的回调函数 */
  const onFinish = (values: Store) => {
    const payload = values;
    if (operationType === 'edit') {
      payload.id = query.id;
    };
    dispatch({
      type: operationType === 'add' ? 'employee/addDepartment' : 'employee/updateDepartment',
      payload,
      callback: () => {
        message.success('操作成功');
        history.goBack();
      }
    });
  };

  return <PageHeaderWrapper>
    <div className="global-container">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: true,
          creator: getLoginUserName(),
          createdTime: moment().format('YYYY-MM-DD hh:mm:ss')
        }}
        onFinish={onFinish}
      >
        <Card
          className="card-no-border"
          title={<IconTitle title={`${operationType === 'add' ? '新增' : '编辑'}科室信息`} />}
          extra={<SaveAndGoBackButtons loading={operationType === 'add' ? loading.effects['employee/addDepartment'] : loading.effects['employee/updateDepartment']} />}
        >
          <Row gutter={24}>
            <Col {...colProps}>
              <Form.Item label="科室编号" name="number">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item label="科室名称" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item label="科室状态" name="status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col sm={12} xs={24}>
              <Form.Item label="科室简介" name="introduction">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...colProps}>
              <Form.Item label="创建人" name="creator">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item label="创建时间" name="createdTime">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form >
    </div>
  </PageHeaderWrapper>;
};

export default connect(({ employee, common, loading }: {
  employee: EmployeeManagementState;
  common: CommonState;
  loading: Loading;
}) => ({ employee, common, loading }))(AddOrEditDepartment);