/*
 * @Author: Code_Master
 * @Date: 2020-10-02 15:21:05
 * @LastEditTime: 2020-11-01 15:00:25
 * @LastEditors: Code_Master
 * @FilePath: /redrock-20th/src/store/index.js
 * @Description: The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.
 */
import { createStore } from 'vuex'
import { DLELTE_IMAGE, UPLOAD_IMAGE } from './type/actions'
import { DELETE_EDIT_IMAGES, END_IMAGE_UPLOADING, SET_EDIT_IMAGES, SET_IMAGE_UPLOADING } from './type/mutations'
// import { ImageService } from '../server/api'
// import { ImageService } from '../server/api';

export default createStore({
  state: {
    image: [],
    imageId: [],
    isUploading: false,
    gameState: false
  },
  mutations: {
    [SET_IMAGE_UPLOADING] (state) {
      state.isUploading = true
    },
    [END_IMAGE_UPLOADING] (state) {
      state.isUploading = false
    },
    [SET_EDIT_IMAGES] (state, { blob, imageId }) {
      state.image.push(blob)
      state.imageId.push(imageId)
    },
    [DELETE_EDIT_IMAGES] (state, index) {
      state.image.splice(index, 1)
      state.imageId.splice(index, 1)
    }
  },
  actions: {
    async [UPLOAD_IMAGE] ({ commit }, blob) {
      commit(SET_IMAGE_UPLOADING)
      try {
        // const { data } = await ImageService.post(blob)
        commit(END_IMAGE_UPLOADING)
        commit(SET_EDIT_IMAGES, { blob })
      } catch (error) {
        commit(END_IMAGE_UPLOADING)
      }
    },
    async [DLELTE_IMAGE] ({ commit, state }, index) {
      try {
        // await ImageService.delete([state.imageId[index]])
        commit(DELETE_EDIT_IMAGES, index)
      } catch (error) {
        commit(DELETE_EDIT_IMAGES, index)
      }
    }
  },
  modules: {
  },
  getters: {
    editImage (state) {
      return state.image
    },
    imageUploading (state) {
      return state.isUploading
    }
  }
})
