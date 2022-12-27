import request from './request'
// 获取好友列表
export function friendList(params) {
  return request.get('/friends', params)
}
//添加好友
export function recordFriend(data) {
  return request.post('/friends/record', data)
}
//删除好友
export function deleteFriend(id) {
  return request.delete(`/friends/${id}`)
}
// 获取好友详情
export function getFriendDetails(params) {
  return request.get(`/user/${params}`)
}
// 获取好友请求列表
export function friendRecordList(params) {
  return request.get('/friends/record', params)
}
//同意/拒绝好友请求
export function friendRecord(data) {
  return request.put('/friends/record', data)
}
// 查询非好友列表
export function getUserList(params){
  return request.get('/friends/userQuery', params)
}