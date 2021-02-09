import {
  observable, configure, action, decorate,
} from 'mobx'
import { request } from '../ApiModel/ApiModel'

configure({ enforceActions: 'observed' })

export class TagsModel {
  constructor() {
    Object.freeze(this.initialState)

    this.init()
  }

  initialState = {
    favoriteTags: undefined,
    tagsByCategories: undefined,
  }

  getFavoriteTags() {
    return request({
      method: 'GET',
      url: '/tags/favorites',
    })
      .then(data => this.set('favoriteTags', data || []))
  }

  getTagsByCategories() {
    return request({
      method: 'GET',
      url: '/tags/categories',
    })
      .then(data => this.set('tagsByCategories', data))
  }

  createTag({ name, emoji }, categoryId) {
    return request({
      method: 'POST',
      url: `/tags/categories/${categoryId}`,
      params: { name, emoji },
    })
      .then(() => this.getTagsByCategories())
  }

  archiveTag(id) {
    return request({
      method: 'DELETE',
      url: `/tags/${id}`,
    })
      .then(() => this.getTagsByCategories())
  }

  favoriteTag(id) {
    return request({
      method: 'POST',
      url: `/tags/${id}/favorite`,
    })
      .then(() => this.getTagsByCategories())
  }

  halfFavoriteTag(id) {
    return request({
      method: 'POST',
      url: `/tags/${id}/half-favorite`,
    })
      .then(() => this.getTagsByCategories())
  }

  unfavoriteTag(id) {
    return request({
      method: 'POST',
      url: `/tags/${id}/unfavorite`,
    })
      .then(() => this.getTagsByCategories())
  }

  createTagCategory(name) {
    return request({
      method: 'POST',
      url: '/tags/categories',
      params: { name },
    })
      .then(() => this.getTagsByCategories())
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

decorate(TagsModel, {
  tagsByCategories: observable,
  favoriteTags: observable,

  init: action,
  set: action,
  getTagsByCategories: action,
  getFavoriteTags: action,
  archiveTag: action,
  createTag: action,
  favoriteTag: action,
  halfFavoriteTag: action,
  unfavoriteTag: action,
  createTagCategory: action,
})

export default new TagsModel()
