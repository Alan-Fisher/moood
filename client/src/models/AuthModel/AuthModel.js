import {
  configure, action, decorate,
} from 'mobx'
import { request } from '../ApiModel/ApiModel'

configure({ enforceActions: 'observed' })

export class AuthModel {
  constructor() {
    Object.freeze(this.initialState)

    this.init()
  }

  initialState = {
  }

  login(email, password) {
    return request({
      method: 'POST',
      url: '/auth/login',
      params: { email, password },
    })
      .then(({ accessToken }) => {
        localStorage.setItem('accessToken', accessToken)
      })
  }

  logout() {
    localStorage.removeItem('accessToken')
    window.location.replace('/login')
  }

  hasProperty = key => Object.prototype.hasOwnProperty.call(this, key)

  set(item, value) {
    if (this.hasProperty(item)) {
      this[item] = value
    }
  }

  init() {
    for (const kvp of Object.entries(this.initialState)) {
      const [key, value] = kvp

      this[key] = value
    }
  }
}

decorate(AuthModel, {
  init: action,
  set: action,
  login: action,
})

export default new AuthModel()
