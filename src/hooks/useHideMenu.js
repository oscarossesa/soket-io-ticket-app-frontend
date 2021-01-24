import { useContext, useEffect } from 'react'
import { UiContext } from '../context/uiContext'

export const useHideMenu = hide => {

  const { onShowMenu, onHideMenu } = useContext(UiContext)

  useEffect(() => {
    if (hide) {
      onHideMenu()
    } else {
      onShowMenu()
    }
  }, [hide, onShowMenu, onHideMenu])
}