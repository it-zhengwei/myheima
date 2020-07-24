import copy from '@/api/copy.js'
//获取题库列表
function getQuestion (params) {
  return copy({
    url: '/question/list',
    params
  })
}
//暴露
export { getQuestion }
