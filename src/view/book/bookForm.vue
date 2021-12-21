<template>
  <div>
    <div class="gva-form-box">
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
          <el-date-picker v-model="formData.crawlLastTime" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="爬虫源站ID:">
          <el-input v-model.number="formData.crawlSourceId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker v-model="formData.createTime" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="最新目录ID:">
          <el-input v-model.number="formData.lastIndexId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最新目录名:">
          <el-input v-model="formData.lastIndexName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最新目录更新时间:">
          <el-date-picker v-model="formData.lastIndexUpdateTime" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="小说封面:">
          <el-input v-model="formData.picUrl" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="评分，预留字段:">
          <el-input-number v-model="formData.score" :precision="2" clearable></el-input-number>
        </el-form-item>
        <el-form-item label="状态，0：入库，1：上架:">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="更新时间:">
          <el-date-picker v-model="formData.updateTime" type="date" placeholder="选择日期" clearable></el-date-picker>
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
        <el-form-item>
          <el-button size="mini" type="primary" @click="save">保存</el-button>
          <el-button size="mini" type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  createBook,
  updateBook,
  findBook
} from '@/api/book' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'Book',
  mixins: [infoList],
  data() {
    return {
      type: '',
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
    // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (this.$route.query.id) {
      const res = await findBook({ ID: this.$route.query.id })
      if (res.code === 0) {
        this.formData = res.data.rebook
        this.type = 'update'
      }
    } else {
      this.type = 'create'
    }
  },
  methods: {
    async save() {
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
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
