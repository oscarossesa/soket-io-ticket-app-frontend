import React, { createContext, useState } from 'react'

export const UiContext = createContext()

export const UiProvider = ({ children }) => {

  const [hideMenu, setHideMenu] = useState(false)

  const onShowMenu = () => setHideMenu(false)

  const onHideMenu = () => setHideMenu(true)

  return (
    <UiContext.Provider value={{ hideMenu, onShowMenu, onHideMenu }}>
      {children}
    </UiContext.Provider>
  )
}