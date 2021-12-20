const prefix = 'mystery-shape-'
export const localStorageCustom = {
  makeKey: (key: string) => {
    return `${prefix}${key}`
  },
  getItem: (key: string) => {
    return localStorage.getItem(localStorageCustom.makeKey(key))
  },
  setItem: (key: string, value: string) => {
    return localStorage.setItem(localStorageCustom.makeKey(key), value)
  },
  remove: (key: string) => {
    return localStorage.removeItem(localStorageCustom.makeKey(key))
  },
  removeItem: (key: string) => {
    return localStorage.removeItem(localStorageCustom.makeKey(key))
  },
  clearAll: () => {
    return localStorage.clear()
  },
  getIsUserExist: () => {
    try {
      const userRaw = localStorage.getItem(localStorageCustom.makeKey('user')) as string
      return !!userRaw
    } catch {
      return false
    }
  },
}
