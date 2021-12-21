import service from '@/utils/request'

// @Tags BookIndex
// @Summary 创建BookIndex
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BookIndex true "创建BookIndex"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /bookIndex/createBookIndex [post]
export const createBookIndex = (data) => {
  return service({
    url: '/bookIndex/createBookIndex',
    method: 'post',
    data
  })
}

// @Tags BookIndex
// @Summary 删除BookIndex
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BookIndex true "删除BookIndex"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /bookIndex/deleteBookIndex [delete]
export const deleteBookIndex = (data) => {
  return service({
    url: '/bookIndex/deleteBookIndex',
    method: 'delete',
    data
  })
}

// @Tags BookIndex
// @Summary 删除BookIndex
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除BookIndex"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /bookIndex/deleteBookIndex [delete]
export const deleteBookIndexByIds = (data) => {
  return service({
    url: '/bookIndex/deleteBookIndexByIds',
    method: 'delete',
    data
  })
}

// @Tags BookIndex
// @Summary 更新BookIndex
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BookIndex true "更新BookIndex"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /bookIndex/updateBookIndex [put]
export const updateBookIndex = (data) => {
  return service({
    url: '/bookIndex/updateBookIndex',
    method: 'put',
    data
  })
}

// @Tags BookIndex
// @Summary 用id查询BookIndex
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.BookIndex true "用id查询BookIndex"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /bookIndex/findBookIndex [get]
export const findBookIndex = (params) => {
  return service({
    url: '/bookIndex/findBookIndex',
    method: 'get',
    params
  })
}

// @Tags BookIndex
// @Summary 分页获取BookIndex列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取BookIndex列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /bookIndex/getBookIndexList [get]
export const getBookIndexList = (params) => {
  return service({
    url: '/bookIndex/getBookIndexList',
    method: 'get',
    params
  })
}
