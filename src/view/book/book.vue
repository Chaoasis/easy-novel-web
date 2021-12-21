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
        <el-table-column align="left" label="作者id" prop="authorId" width="120" />
        <el-table-column align="left" label="作者名" prop="authorName" width="120" />
        <el-table-column align="left" label="书籍描述" prop="bookDesc" width="120" />
        <el-table-column align="left" label="小说名" prop="bookName" width="120" />
        <el-table-column align="left" label="书籍状态，0：连载中，1：已完结" prop="bookStatus" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.bookStatus) }}</template>
        </el-table-column>
        <el-table-column align="left" label="分类ID" prop="catId" width="120" />
        <el-table-column align="left" label="分类名" prop="catName" width="120" />
        <el-table-column align="left" label="评论数" prop="commentCount" width="120" />
        <el-table-column align="left" label="抓取的源站小说ID" prop="crawlBookId" width="120" />
        <el-table-column align="left" label="是否已停止更新，0：未停止，1：已停止" prop="crawlIsStop" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.crawlIsStop) }}</template>
        </el-table-column>
        <el-table-column align="left" label="最后一次的抓取时间" prop="crawlLastTime" width="120" />
        <el-table-column align="left" label="爬虫源站ID" prop="crawlSourceId" width="120" />
        <el-table-column align="left" label="创建时间" prop="createTime" width="120" />
        <el-table-column align="left" label="最新目录ID" prop="lastIndexId" width="120" />
        <el-table-column align="left" label="最新目录名" prop="lastIndexName" width="120" />
        <el-table-column align="left" label="最新目录更新时间" prop="lastIndexUpdateTime" width="120" />
        <el-table-column align="left" label="小说封面" prop="picUrl" width="120" />
        <el-table-column align="left" label="评分，预留字段" prop="score" width="120" />
        <el-table-column align="left" label="状态，0：入库，1：上架" prop="status" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" prop="updateTime" width="120" />
        <el-table-column align="left" label="点击量" prop="visitCount" width="120" />
        <el-table-column align="left" label="总字数" prop="wordCount" width="120" />
        <el-table-column align="left" label="作品方向，0：男频，1：女频'" prop="workDirection" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.workDirection) }}</template>
        </el-table-column>
        <el-table-column align="left" label="昨日订阅数" prop="yesterdayBuy" width="120" />
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="text" icon="edit" size="small" class="table-button" @click="updateBook(scope.row)">变更</el-button>
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
        <el-form-item label="作者id:">
          <el-input v-model.number="formData.authorId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="作者名:">
          <el-input v-model="formData.authorName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="书籍描述:">
          <el-input v-model="formData.bookDesc" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="小说名:">
          <el-input v-model="formData.bookName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="书籍状态，0：连载中，1：已完结:">
          <el-switch v-model="formData.bookStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="分类ID:">
          <el-input v-model.number="formData.catId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="分类名:">
          <el-input v-model="formData.catName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="评论数:">
          <el-input v-model.number="formData.commentCount" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="抓取的源站小说ID:">
          <el-input v-model="formData.crawlBookId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否已停止更新，0：未停止，1：已停止:">
          <el-switch v-model="formData.crawlIsStop" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="最后一次的抓取时间:">
          <el-date-picker v-model="formData.crawlLastTime" type="date" style="width:100%" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="爬虫源站ID:">
          <el-input v-model.number="formData.crawlSourceId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker v-model="formData.createTime" type="date" style="width:100%" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="最新目录ID:">
          <el-input v-model.number="formData.lastIndexId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最新目录名:">
          <el-input v-model="formData.lastIndexName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最新目录更新时间:">
          <el-date-picker v-model="formData.lastIndexUpdateTime" type="date" style="width:100%" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="小说封面:">
          <el-input v-model="formData.picUrl" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="评分，预留字段:">
          <el-input-number v-model="formData.score"  style="width:100%" :precision="2" clearable />
        </el-form-item>
        <el-form-item label="状态，0：入库，1：上架:">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="更新时间:">
          <el-date-picker v-model="formData.updateTime" type="date" style="width:100%" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="点击量:">
          <el-input v-model.number="formData.visitCount" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="总字数:">
          <el-input v-model.number="formData.wordCount" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="作品方向，0：男频，1：女频':">
          <el-switch v-model="formData.workDirection" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="昨日订阅数:">
          <el-input v-model.number="formData.yesterdayBuy" clearable placeholder="请输入" />
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
  createBook,
  deleteBook,
  deleteBookByIds,
  updateBook,
  findBook,
  getBookList
} from '@/api/book' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'Book',
  mixins: [infoList],
  data() {
    return {
      listApi: getBookList,
      dialogFormVisible: false,
      type: '',
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        authorId: 0,
        authorName: '',
        bookDesc: '',
        bookName: '',
        bookStatus: false,
        catId: 0,
        catName: '',
        commentCount: 0,
        crawlBookId: '',
        crawlIsStop: false,
        crawlLastTime: new Date(),
        crawlSourceId: 0,
        createTime: new Date(),
        lastIndexId: 0,
        lastIndexName: '',
        lastIndexUpdateTime: new Date(),
        picUrl: '',
        score: 0,
        status: false,
        updateTime: new Date(),
        visitCount: 0,
        wordCount: 0,
        workDirection: false,
        yesterdayBuy: 0,
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
      if (this.searchInfo.bookStatus === ""){
        this.searchInfo.bookStatus=null
      }
      if (this.searchInfo.crawlIsStop === ""){
        this.searchInfo.crawlIsStop=null
      }
      if (this.searchInfo.status === ""){
        this.searchInfo.status=null
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
        this.deleteBook(row)
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
      const res = await deleteBookByIds({ ids })
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
    async updateBook(row) {
      const res = await findBook({ ID: row.ID })
      this.type = 'update'
      if (res.code === 0) {
        this.formData = res.data.rebook
        this.dialogFormVisible = true
      }
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.formData = {
        authorId: 0,
        authorName: '',
        bookDesc: '',
        bookName: '',
        bookStatus: false,
        catId: 0,
        catName: '',
        commentCount: 0,
        crawlBookId: '',
        crawlIsStop: false,
        crawlLastTime: new Date(),
        crawlSourceId: 0,
        createTime: new Date(),
        lastIndexId: 0,
        lastIndexName: '',
        lastIndexUpdateTime: new Date(),
        picUrl: '',
        score: 0,
        status: false,
        updateTime: new Date(),
        visitCount: 0,
        wordCount: 0,
        workDirection: false,
        yesterdayBuy: 0,
      }
    },
    async deleteBook(row) {
      const res = await deleteBook({ ID: row.ID })
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
          res = await createBook(this.formData)
          break
        case 'update':
          res = await updateBook(this.formData)
          break
        default:
          res = await createBook(this.formData)
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
