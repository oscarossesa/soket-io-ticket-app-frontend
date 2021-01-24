import React from 'react'
import { SocketProvider } from './context/SocketContext'
import { UiProvider } from './context/uiContext'
import RouterPages from './pages/RouterPages'

const TicketApp = () => {
  return (
    <SocketProvider>
      <UiProvider>
        <RouterPages />
      </UiProvider>
    </SocketProvider>
  )
}

export default TicketApp
