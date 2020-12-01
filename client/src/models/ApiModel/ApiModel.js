import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

export const axiosInstance = axios.create({
  baseURL,
  responseType: 'json',
})

export const request = async ({
  method,
  url,
  params = {},
  withoutToken = false,
}) => {
  const api = axiosInstance
  const accessToken = localStorage.getItem('accessToken')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }

  const queryParams = Object.entries(params)
    .filter(param => param[1] !== undefined)
    .map(param => `${param[0]}=${param[1]}`)
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
  const getUrl = url + queryString

  try {
    let response

    switch (method) {
      case 'GET':
        response = await api.get(getUrl, { headers })
        break
      case 'POST':
        response = await api.post(url, params, { headers })
        break
      case 'PATCH':
        response = await api.patch(url, params, { headers })
        break
      case 'DELETE':
        response = await api.delete(url, { headers })
        break
      default:
        response = await api.get(url, params, { headers })
        break
    }

    return response.data
  } catch (err) {
    const { location } = window

    const handleError = () => {
      if (err.response?.data) {
        alert(JSON.stringify(err.response?.data, '', ' ')) // eslint-disable-line no-alert
      } else {
        alert(err.message) // eslint-disable-line no-alert
      }
    }

    const signoutWithBackUrl = () => {
      location.href = `/login?u=${location.pathname}`
      localStorage.removeItem('accessToken')
    }

    // TODO: make it understandable, beautify error interface
    if (err.response?.status !== 401 && !(location.pathname === '/login' && err.response?.status === 401)) {
      handleError()
    } else if (err.response?.status === 401 && location.pathname !== '/login') {
      signoutWithBackUrl()
    }

    return Promise.reject(err)
  }
}
