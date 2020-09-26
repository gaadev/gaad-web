<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data" v-model="hostForm" @row-save="handleRowSave">
      <template slot-scope="scope" slot="idForm" >
        <el-row>
          <el-col :span="12">
            <el-input v-model="hostForm.type"></el-input>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-button type="text" @click="handleAddCategory">添加分类</el-button>
          </el-col>
        </el-row>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import tableOption from '@/const/host/index'

export default {
  name: 'host',
  data() {
    return {
      hostForm:{},
      option: tableOption,
      form:{},
      data:[]
    }
  },
  created() {

  },
  methods: {
    handleRowSave(row,done,loading){
      console.log(row);
      console.log(this.hostForm);
      done();
    },
    handleAddCategory() {
      this.$message.success("点击添加分类")
    }
  },

}
</script>