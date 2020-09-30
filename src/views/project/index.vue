<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data" >
      <template slot-scope="scope" slot="menuLeft">
        <el-button type="primary" icon="el-icon-plus" size="small"  @click.stop="handleAdd()">新 增</el-button>
      </template>
<!--      <template slot-scope="scope" slot="clusterNameForm">-->
<!--        <avue-form ref="form"  :option="formOption" >-->

<!--        </avue-form>-->
<!--      </template>-->
    </avue-crud>
  </basic-container>
</template>
<script>
import tableOption from '@/const/project/index'
import formOption from '@/const/project/index_form'

export default {
  name: 'host',
  data() {
    return {
      option: tableOption,
      formOption: formOption,
      data:[]
    }
  },
  created() {

  },
  methods: {
    handleAdd() {
      this.$message.success("111111")
    }
  },

}
</script>