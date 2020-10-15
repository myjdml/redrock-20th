import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = 'https://cyxbsmobile.redrock.team/wxapi/redrock-20th-anniversary'
    this.setHeader()
  },

  get (resource) {
    return Vue.axios.get(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  patch (resource, params) {
    return Vue.axios.patch(resource, params)
  },

  put (resource, params) {
    return Vue.axios.put(resource, params)
  },

  delete (resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

export default ApiService

export const ImageService = {
  post (blob) {
    const formData = new FormData()
    formData.append(
      'uploadFile',
      blob,
      `${Math.random()
        .toString(36)
        .substr(2)}.jpg`
    )
    return ApiService.post('image', formData)
  },
  delete (imageIds) {
    return ApiService.post('image/delete', imageIds)
  }
}
