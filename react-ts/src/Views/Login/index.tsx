import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './login.css';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import qs from 'qs';

const Login: React.FC = () => {


  const [isLogin, setIsLogin] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post('/api/login', qs.stringify({ password: values.password }), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data?.data) {
        setIsLogin(true)
      } else {
        message.error('login failed')
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    isLogin ? <Navigate replace to="/" /> :
      <div className="login-page">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: '密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
}

export default Login;
