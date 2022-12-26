import request from './request'
// 登录接口
export function login(data) {
  return request.post('/auth/login', data)
}
// 第三方登录
export function oauthLogin(params) {
  return request.get('/auth/githubLogin', params)
}
//注册
export function registerede(data) {
  return request.post('/auth/registered', data)
}
// 邮箱验证码
export function sendEmailCode(data) {
  return request.post('/auth/sendEmailCode', data)
}