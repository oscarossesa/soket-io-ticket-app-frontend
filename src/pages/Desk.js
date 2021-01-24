import React, { useContext, useState } from 'react'
import { Row, Col, Typography, Button, Divider } from 'antd'
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import { useHideMenu } from '../hooks/useHideMenu'
import { getUserStorage, removeUserStorage } from '../helpers/getUserStorage'
import { Redirect, useHistory } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
const { Title, Text } = Typography

const Desk = () => {

  const history = useHistory()
  useHideMenu(false)
  const [user] = useState(getUserStorage())
  const { socket } = useContext(SocketContext)
  const [ticket, setTicket] = useState(null)

  const handleExit = () => {
    removeUserStorage()
    history.replace('/ingresar')
  }

  const handleNextTicket = () => {
    socket.emit('next-ticket-to-attend', user, (ticket) => {
      setTicket(ticket)
    })
  }

  if (!user.agent || !user.desk) {
    return <Redirect to='/ingresar' />
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title lavel={2}>{user.agent}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type='success'>{user.desk}</Text>
        </Col>
        <Col span={4} align='right'>
          <Button
            shape="round"
            type="danger"
            onClick={handleExit}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {
        ticket && (
          <Row>
            <Col>
              <Text>Está atendiendo el ticket número: </Text>
              <Text
                style={{ fontSize: 30 }}
                type="danger"
              >
                {ticket.number}
              </Text>
            </Col>
          </Row>
        )
      }
      <Row>
        <Col
          offset={18}
          span={6}
          align="right"
        >
          <Button
            onClick={handleNextTicket}
            shape="round"
            type="primary"
          >
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Desk
