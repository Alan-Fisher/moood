import {
  observable, configure, action, decorate,
} from 'mobx'
import { request } from '../ApiModel/ApiModel'

configure({ enforceActions: 'observed' })

export class MoodModel {
  constructor() {
    Object.freeze(this.initialState)

    this.init()
  }

  initialState = {
    moods: undefined,
    mood: {
      moodLevel: 4,
      feelingIds: [],
      tagIds: [],
      note: '',
      createDateTime: null,
    },
  }

  getMoods() {
    return request({
      method: 'GET',
      url: '/moods',
    })
      .then(moods => this.set('moods', moods))
      .catch()
  }

  sendMood(params) {
    return request({
      method: 'POST',
      url: '/moods',
      params,
    })
      .then()
      .catch()
  }

  archiveMood(id) {
    return request({
      method: 'DELETE',
      url: `/moods/${id}`,
    })
      .then(() => this.getMoods())
      .catch()
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

decorate(MoodModel, {
  mood: observable,
  moods: observable,

  init: action,
  set: action,
  getMoods: action,
  sendMood: action,
  archiveMood: action,
})

export default new MoodModel()
