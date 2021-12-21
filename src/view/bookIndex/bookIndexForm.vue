<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="小说ID:">
          <el-input v-model.number="formData.bookId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="createTime字段:">
          <el-date-picker v-model="formData.createTime" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="目录名:">
          <el-input v-model="formData.indexName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="目录号:">
          <el-input v-model.number="formData.indexNum" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="存储方式:">
          <el-input v-model="formData.storageType" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="updateTime字段:">
          <el-date-picker v-model="formData.updateTime" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="字数:">
          <el-input v-model.number="formData.wordCount" clearable placeholder="请输入" />
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
  createBookIndex,
  updateBookIndex,
  findBookIndex
} from '@/api/bookIndex' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'BookIndex',
  mixins: [infoList],
  data() {
    return {
      type: '',
      formData: {
        bookId: 0,
        createTime: new Date(),
        indexName: '',
        indexNum: 0,
        storageType: '',
        updateTime: new Date(),
        wordCount: 0,
      }
    }
  },
  async created() {
    // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (this.$route.query.id) {
      const res = await findBookIndex({ ID: this.$route.query.id })
      if (res.code === 0) {
        this.formData = res.data.rebookIndex
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
          res = await createBookIndex(this.formData)
          break
        case 'update':
          res = await updateBookIndex(this.formData)
          break
        default:
          res = await createBookIndex(this.formData)
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
