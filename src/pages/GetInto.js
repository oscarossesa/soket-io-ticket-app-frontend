import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { Redirect, useHistory } from 'react-router-dom'
import { useHideMenu } from '../hooks/useHideMenu'
import { getUserStorage } from '../helpers/getUserStorage'

const { Title, Text } = Typography

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 14,
  },
}

const GetInto = () => {

  useHideMenu(false)
  const [user] = useState(getUserStorage())

  const history = useHistory()

  const onFinish = ({ agentName, desk }) => {
    localStorage.setItem('agent', agentName)
    localStorage.setItem('desk', desk)

    history.push('/escritorio')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  if (user.agent && user.desk) {
    return <Redirect to='/escritorio' />
  }

  return (
    <>
      <Title lavel={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio</Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre del agente"
          name="agentName"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su nombre',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="desk"
          rules={[
            {
              required: true,
              message: 'Ingrese el número de escritorio',
            },
          ]}
        >
          <InputNumber min="0" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
          >
            <SaveOutlined />
          Ingresar
        </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default GetInto
