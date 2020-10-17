import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://cyxbsmobile.redrock.team/wxapi/redrock-20th-anniversary/' : '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
export async function postWorkLessInfo (url, formValue) {
  return await instance.post(url, {
    name: formValue.name,
    phone: formValue.phone,
    gradeAndPosition: formValue.gradeAndPosition,
    address: formValue.address,
    file: formValue.file
  })
}
export async function postWorkedInfo (url, formValue) {
  return await instance.post(url, {
    name: formValue.name,
    sno: formValue.sno,
    phone: formValue.phone
  })
}
