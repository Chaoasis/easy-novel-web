<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="mini" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
        <div class="gva-btn-list">
            <el-button size="mini" type="primary" icon="plus" @click="openDialog">新增</el-button>
            <el-popover v-model:visible="deleteVisible" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin-top: 8px;">
                <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
                <el-button size="mini" type="primary" @click="onDelete">确定</el-button>
            </div>
            <template #reference>
                <el-button icon="delete" size="mini" style="margin-left: 10px;" :disabled="!multipleSelection.length">删除</el-button>
            </template>
            </el-popover>
        </div>
        <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="createTime字段" prop="createTime" width="120" />
        <el-table-column align="left" label="createUserId字段" prop="createUserId" width="120" />
        <el-table-column align="left" label="分类名" prop="name" width="120" />
        <el-table-column align="left" label="排序" prop="sort" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.sort) }}</template>
        </el-table-column>
        <el-table-column align="left" label="updateTime字段" prop="updateTime" width="120" />
        <el-table-column align="left" label="updateUserId字段" prop="updateUserId" width="120" />
        <el-table-column align="left" label="作品方向，0：男频，1：女频'" prop="workDirection" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.workDirection) }}</template>
        </el-table-column>
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="text" icon="edit" size="small" class="table-button" @click="updateBookCategory(scope.row)">变更</el-button>
            <el-button type="text" icon="delete" size="mini" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="createTime字段:">
          <el-date-picker v-model="formData.createTime" type="date" style="width:100%" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="createUserId字段:">
          <el-input v-model.number="formData.createUserId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="分类名:">
          <el-input v-model="formData.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序:">
          <el-switch v-model="formData.sort" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="updateTime字段:">
          <el-date-picker v-model="formData.updateTime" type="date" style="width:100%" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="updateUserId字段:">
          <el-input v-model.number="formData.updateUserId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="作品方向，0：男频，1：女频':">
          <el-switch v-model="formData.workDirection" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  createBookCategory,
  deleteBookCategory,
  deleteBookCategoryByIds,
  updateBookCategory,
  findBookCategory,
  getBookCategoryList
} from '@/api/bookCategory' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'BookCategory',
  mixins: [infoList],
  data() {
    return {
      listApi: getBookCategoryList,
      dialogFormVisible: false,
      type: '',
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        createTime: new Date(),
        createUserId: 0,
        name: '',
        sort: false,
        updateTime: new Date(),
        updateUserId: 0,
        workDirection: false,
      }
    }
  },
  async created() {
    await this.getTableData()
  },
  methods: {
  onReset() {
    this.searchInfo = {}
  },
  // 条件搜索前端看此方法
    onSubmit() {
      this.page = 1
      this.pageSize = 10
      if (this.searchInfo.sort === ""){
        this.searchInfo.sort=null
      }
      if (this.searchInfo.workDirection === ""){
        this.searchInfo.workDirection=null
      }
      this.getTableData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteRow(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteBookCategory(row)
      })
    },
    async onDelete() {
      const ids = []
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      this.multipleSelection &&
        this.multipleSelection.map(item => {
          ids.push(item.ID)
        })
      const res = await deleteBookCategoryByIds({ ids })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        if (this.tableData.length === ids.length && this.page > 1) {
          this.page--
        }
        this.deleteVisible = false
        this.getTableData()
      }
    },
    async updateBookCategory(row) {
      const res = await findBookCategory({ ID: row.ID })
      this.type = 'update'
      if (res.code === 0) {
        this.formData = res.data.rebookCategory
        this.dialogFormVisible = true
      }
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.formData = {
        createTime: new Date(),
        createUserId: 0,
        name: '',
        sort: false,
        updateTime: new Date(),
        updateUserId: 0,
        workDirection: false,
      }
    },
    async deleteBookCategory(row) {
      const res = await deleteBookCategory({ ID: row.ID })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        if (this.tableData.length === 1 && this.page > 1) {
          this.page--
        }
        this.getTableData()
      }
    },
    async enterDialog() {
      let res
      switch (this.type) {
        case 'create':
          res = await createBookCategory(this.formData)
          break
        case 'update':
          res = await updateBookCategory(this.formData)
          break
        default:
          res = await createBookCategory(this.formData)
          break
      }
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '创建/更改成功'
        })
        this.closeDialog()
        this.getTableData()
      }
    },
    openDialog() {
      this.type = 'create'
      this.dialogFormVisible = true
    }
  },
}
</script>

<style>
</style>
