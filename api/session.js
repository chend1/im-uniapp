import request from './request'
// 获取会话列表
export function sessionList(params) {
  return request.get('/sessions', params)
}
//创建会话
export function createSession(data) {
  return request.post('/sessions', data)
}
// 移除会话
export function removeSession(id) {
  return request.delete(`/sessions/${id}`)
}