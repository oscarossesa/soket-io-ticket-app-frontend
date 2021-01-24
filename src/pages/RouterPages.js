import React, { useContext } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import GetInto from './GetInto'
import Line from './Line';
import Desk from './Desk';
import CreateTicket from './CreateTicket';
import { UiContext } from '../context/uiContext';

const { Sider, Content } = Layout;

const RouterPages = () => {

  const { hideMenu } = useContext(UiContext)

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          hidden={hideMenu}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to='/ingresar'>
                Ingresar
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to='/cola'>
                Cola
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to='/crear'>
                Crear Ticket
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path='/ingresar' component={GetInto} />
              <Route path='/cola' component={Line} />
              <Route path='/crear' component={CreateTicket} />
              <Route path='/escritorio' component={Desk} />
              <Redirect to='/ingresar' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default RouterPages
