import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://cyxbsmobile.redrock.team/wxapi/redrock-20th-anniversary/' : '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export async function getWorkLessInfo (url, params) {
  return await instance.get(url, params)
}
