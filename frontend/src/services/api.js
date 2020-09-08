import { fetchRequest } from 'utils/helpers'

export const fetchRequestResponse = async (
  { uri, method, body, params },
  expectedStatus,
  { enqueueSnackbar, successMessage },
) => {
  let response
  try {
    response = await fetchRequest({ uri, method, body, params })
  } catch (e) {
    enqueueSnackbar(`'Problème de connexion au serveur'${JSON.stringify(e)}`, { variant: 'error' })
    return null
  }
  if (!response || response.status !== expectedStatus) {
    enqueueSnackbar('Une erreur est survenue', { variant: 'error' })
    return null
  }
  if (successMessage) {
    enqueueSnackbar(successMessage, { variant: 'success' })
  }
  return response
}
