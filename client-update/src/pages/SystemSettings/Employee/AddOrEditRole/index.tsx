import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, Input, Switch, message } from 'antd';
import { connect, history, Dispatch, Loading } from 'umi';
import { Store } from 'rc-field-form/lib/interface';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { StyleComponents } from '@/components';
import { CommonState } from '@/models/common';
import { getLoginUserName } from '@/utils/util';
import { EmployeeManagementState } from '../data';
import { AnyObject } from 'typings';

const { IconTitle, SaveAndGoBackButtons } = StyleComponents;

const colProps = {
  xs: 24,
  md: 12,
  lg: 6
};

interface AddOrEditRoleProps {
  employee: EmployeeManagementState;
  common: CommonState;
  location: {
    query: { [key: string]: any }
  };
  dispatch: Dispatch;
  loading: Loading;
};

const AddOrEditRole: React.FC<AddOrEditRoleProps> = props => {
  // form
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  // props
  const {
    employee: { roleDetail },
    common: { initNumber, operationType },
    location: {
      query
    },
    dispatch,
    loading
  } = props;

  /** 新增时，自动填充编号 */
  useEffect(() => {
    if (operationType === 'add') {
      setFieldsValue({ number: initNumber });
    };
  }, [initNumber]);

  /** 编辑时，表单数据回显 */
  useEffect(() => {
    if (operationType === 'edit') {
      setFieldsValue(roleDetail);
    };
  }, [roleDetail]);

  /** 提交表单且校验无误后调用的函数 */
  const onFinish = (values: Store) => {
    const payload: AnyObject = {
      ...values,
      creator: getLoginUserName()
    };
    if (operationType === 'edit') {
      payload.id = query.id;
    };
    dispatch({
      type: operationType === 'edit' ? 'employee/updateRole' : 'employee/addRole',
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
        layout="vertical"
        form={form}
        initialValues={{
          status: true
        }}
        onFinish={onFinish}
      >
        <Card
          className="card-no-border"
          title={<IconTitle title={`${operationType === 'add' ? '新增' : '编辑'}角色信息`} />}
          extra={<SaveAndGoBackButtons loading={operationType === 'add' ? loading.effects['employee/addRole'] : loading.effects['employee/updateRole']} />}
        >
          <Row gutter={24}>
            <Col {...colProps}>
              <Form.Item label="角色编号" name="number">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item label="角色名称" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item label="角色状态" name="status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...colProps} lg={12}>
              <Form.Item label="角色描述" name="description">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div>TODO: 权限分配</div>
        </Card>
      </Form>
    </div>
  </PageHeaderWrapper>;
};

export default connect(({ employee, common, loading }: {
  employee: EmployeeManagementState;
  common: CommonState;
  loading: Loading;
}) => ({ employee, common, loading }))(AddOrEditRole);