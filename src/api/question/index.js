import copy from '@/api/copy.js'
//获取题库列表
function getQuestion (params) {
  return copy({
    url: '/question/list',
    params
  })
}
//设置状态
function status (data) {
  return copy({
    url: '/question/status',
    method: 'post',
    data
  })
}
//删除题项
function dele (data) {
  return copy({
    url: '/question/remove',
    method: 'post',
    data
  })
}
//发布题目
function add (data) {
  return copy({
    url: '/question/add',
    method: 'post',
    data
  })
}
//编辑题目
function edit (data) {
  return copy({
    url: '/question/edit',
    method: 'post',
    data
  })
}
//暴露
export { getQuestion, status, dele, add, edit }
