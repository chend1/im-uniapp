import request from './request'
// 获取私聊消息
export function chatMessage(params) {
  return request.get('/messages', params)
}
// 获取群聊消息
export function chatGroupMessage(params) {
  return request.get('/messages/groups',params)
}
// 发送消息
export function sendChatMessage(data) {
  return request.post('/messages/private', data)
}
// 文件上传
export function uploadFile(data) {
  return request.post('/upload/file', data)
}