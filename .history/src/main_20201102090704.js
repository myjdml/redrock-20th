/*
 * @Author: Code_Master
 * @Date: 2020-10-02 15:21:05
 * @LastEditTime: 2020-11-02 09:07:04
 * @LastEditors: Code_Master
 * @FilePath: /redrock-20th/src/main.js
 * @Description: The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/style/font.css'
// import VConsole from 'vconsole'
/* eslint-disable no-unused-vars */
createApp(App).use(store).use(router).mount('#app')
// const vConsole = new VConsole() // 初始化
