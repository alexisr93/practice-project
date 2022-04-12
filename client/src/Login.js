import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import './Login.css';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  const onFinish = (values) => {
      console.log('Success:', values);
  };
    
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };

  return (
    <Row className="login-form-row" justify="center">
      <Col span={6}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          justify="end"
        >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item 
          name="remember" 
          valuePropName="checked" 
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
              Submit
          </Button>
        </Form.Item>
        </Form>
    </Col>
    </Row>
  );
}

export default Login;

