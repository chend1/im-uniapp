import request from './request'
// 获取群聊用户信息
export function getGroupUserInfo(params) {
  return request.get(`/groups/users/${params.id}`)
}
//创建群聊
export function createGroup(data) {
  return request.post('/groups/store', data)
}
//申请加入群聊
export function applyAddGroup(data) {
  return request.post(`/groups/applyJoin/${data.id}`)
}
// 退出群聊
export function deleteGroup(params) {
  return request.delete(`/groups/${params.id}`)
}
// 邀请或者移除用户入群
export function createOrRemoveUser(data) {
  return request.post('/groups/createOrRemoveUser', data)
}