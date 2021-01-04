import { WithSnackbarProps } from 'notistack'
import { useEffect } from 'react'
import { decodeJWT } from 'services/jwtDecode'

export const useSetAuth = (
  setPictureUrl: (pictureUrl: number) => void,
  enqueueSnackbar: WithSnackbarProps['enqueueSnackbar'],
) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const loginStatus = urlParams.get('login')

    if (!loginStatus) {
      return
    }
    const token = urlParams.get('jwt')
    const firebaseToken = urlParams.get('firebase_jwt')

    if (loginStatus !== 'success' || !token) {
      enqueueSnackbar('Il y a eu un problème lors du login', { variant: 'error' })
    } else {
      localStorage.setItem('jwt_token', token)
      if (firebaseToken !== null) {
        localStorage.setItem('firebase_token', firebaseToken)
      }

      const decoded = decodeJWT(token)
      setPictureUrl(decoded.pictureUrl)

      enqueueSnackbar('Hello ou Bonjour ?', {
        variant: 'success',
        autoHideDuration: 3000,
      })
    }

    urlParams.delete('login')
    urlParams.delete('jwt')
    urlParams.delete('firebase_jwt')

    if (Array.from(urlParams).length) {
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
    } else {
      window.history.replaceState({}, '', window.location.pathname)
    }

    // eslint-disable-next-line
  }, [])
}