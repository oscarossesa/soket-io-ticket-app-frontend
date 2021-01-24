export const getUserStorage = () => {
  return {
    agent: localStorage.getItem('agent'),
    desk: localStorage.getItem('desk')
  }
}

export const removeUserStorage = () => localStorage.clear()