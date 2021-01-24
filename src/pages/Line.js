import React, { useContext, useEffect, useState } from 'react'

import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import { useHideMenu } from '../hooks/useHideMenu'
import { SocketContext } from '../context/SocketContext'
import { getLast } from '../helpers/getLast'

const { Title, Text } = Typography

const Line = () => {

  useHideMenu(true)

  const { socket } = useContext(SocketContext)
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    socket.on('assigned-ticket', (assigned) => {
      setTickets(assigned);
    })

    return () => {
      socket.off('assigned-ticket')
    }
  }, [socket])

  useEffect(() => {
    // getLast().then(tickets = setTickets(tickets))

    // Es una forma resumida de la instrucción anterior
    getLast().then(setTickets)
  }, [])

  return (
    <>
      <Title level={1}>
        Atendiendo al cliente
      </Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={item => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{item.agent}</Tag>,
                    <Tag color="magenta">Escritorio: {item.desk}</Tag>
                  ]}
                >
                  <Title>No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket N° ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio</Text>
                      <Tag color="magenta">{item.number}</Tag>
                      <Text type="secondary">Agente</Text>
                      <Tag color="volcano">{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}

export default Line
