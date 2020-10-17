import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://cyxbsmobile.redrock.team/wxapi/redrock-20th-anniversary/' : '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/form-data'
  }
})
export async function postWorkLessInfo (url, params) {
  return await instance.post(url, params)
}
export async function postWorkedInfo (url, params) {
  return await instance.post(url, params)
}
