<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="createTime字段:">
          <el-date-picker v-model="formData.createTime" type="date" placeholder="选择日期" clearable></el-date-picker>
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
          <el-date-picker v-model="formData.updateTime" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="updateUserId字段:">
          <el-input v-model.number="formData.updateUserId" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="作品方向，0：男频，1：女频':">
          <el-switch v-model="formData.workDirection" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
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
  createBookCategory,
  updateBookCategory,
  findBookCategory
} from '@/api/bookCategory' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'BookCategory',
  mixins: [infoList],
  data() {
    return {
      type: '',
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
    // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (this.$route.query.id) {
      const res = await findBookCategory({ ID: this.$route.query.id })
      if (res.code === 0) {
        this.formData = res.data.rebookCategory
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
