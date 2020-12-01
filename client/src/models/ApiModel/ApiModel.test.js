import MockAdapter from 'axios-mock-adapter'

import history from '../../history'
import AuthModel from '../AuthModel/AuthModel'

import { axiosInstance, request } from './ApiModel'

const TOKEN = 'VALID_TOKEN'
const mockAxios = new MockAdapter(axiosInstance)

jest.mock('../../history', () => ({ push: jest.fn() }))

describe('Api model, request()', () => {
  beforeEach(() => {
    AuthModel.refreshToken = jest.fn()
    Storage.prototype.getItem = jest.fn()
    Storage.prototype.setItem = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    mockAxios.reset()
  })

  describe('request', () => {
    beforeEach(() => {
      mockAxios
        .onGet('/test')
        .replyOnce(401)
        .onGet('/test')
        .replyOnce(200, { data: 'test' })
    })

    it('intercepts 401 errors and calls renew method', async () => {
      Storage.prototype.getItem.mockReturnValue(TOKEN)
      AuthModel.refreshToken.mockResolvedValueOnce(TOKEN)

      const response = await request({ method: 'GET', url: '/test' }).catch(() => {})

      expect(AuthModel.refreshToken).toHaveBeenCalledTimes(1)
      expect(response.data).toEqual('test')
    })

    it('does not try to renew the token, when current user is not authenticated', async () => {
      Storage.prototype.getItem.mockReturnValue(null)

      await request({ method: 'GET', url: '/test' }).catch(() => {})

      expect(AuthModel.refreshToken).not.toHaveBeenCalled()
    })

    it('does not retry to renew the token, when renew method returned an error', async () => {
      Storage.prototype.getItem.mockReturnValue(TOKEN)
      AuthModel.refreshToken.mockImplementationOnce(() => Promise.reject(new Error('error')))

      expect.assertions(2)

      try {
        await request({ method: 'GET', url: '/test' })
      } catch (err) {
        expect(AuthModel.refreshToken).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/signin')
      }
    })

    it('redirects the unauthenticated user to signin page if any of the requests returned 401', async () => {
      Storage.prototype.getItem.mockReturnValue(null)

      await request({ method: 'GET', url: '/test' }).catch(() => {})

      expect(history.push).toHaveBeenCalledWith('/signin')
    })
  })
})
