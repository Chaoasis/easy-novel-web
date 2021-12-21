import service from '@/utils/request'

// @Tags BookCategory
// @Summary 创建BookCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BookCategory true "创建BookCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /bookCategory/createBookCategory [post]
export const createBookCategory = (data) => {
  return service({
    url: '/bookCategory/createBookCategory',
    method: 'post',
    data
  })
}

// @Tags BookCategory
// @Summary 删除BookCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BookCategory true "删除BookCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /bookCategory/deleteBookCategory [delete]
export const deleteBookCategory = (data) => {
  return service({
    url: '/bookCategory/deleteBookCategory',
    method: 'delete',
    data
  })
}

// @Tags BookCategory
// @Summary 删除BookCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除BookCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /bookCategory/deleteBookCategory [delete]
export const deleteBookCategoryByIds = (data) => {
  return service({
    url: '/bookCategory/deleteBookCategoryByIds',
    method: 'delete',
    data
  })
}

// @Tags BookCategory
// @Summary 更新BookCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BookCategory true "更新BookCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /bookCategory/updateBookCategory [put]
export const updateBookCategory = (data) => {
  return service({
    url: '/bookCategory/updateBookCategory',
    method: 'put',
    data
  })
}

// @Tags BookCategory
// @Summary 用id查询BookCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.BookCategory true "用id查询BookCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /bookCategory/findBookCategory [get]
export const findBookCategory = (params) => {
  return service({
    url: '/bookCategory/findBookCategory',
    method: 'get',
    params
  })
}

// @Tags BookCategory
// @Summary 分页获取BookCategory列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取BookCategory列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /bookCategory/getBookCategoryList [get]
export const getBookCategoryList = (params) => {
  return service({
    url: '/bookCategory/getBookCategoryList',
    method: 'get',
    params
  })
}
