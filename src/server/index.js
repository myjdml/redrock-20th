import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://cyxbsmobile.redrock.team/wxapi/redrock-20th-anniversary/' : '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
})
export const instanceImg = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://cyxbsmobile.redrock.team/wxapi/redrock-20th-anniversary/' : '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
export async function postWorkLessInfo (url, formValue) {
  return await instance.post(url, {
    name: formValue.name,
    sno: formValue.sno,
    phone: formValue.phone
  })
}
export async function postWorkedInfo (url, params) {
  return await instanceImg.post(url, params)
}
