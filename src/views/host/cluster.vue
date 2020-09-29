<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data" @row-save="handleRowSave" ref="crud">
      <template slot-scope="{row,type,size}" slot="menu">
        <el-button icon="el-icon-setting" :size="size" :type="type">分配主机</el-button>
        <el-button icon="el-icon-share" :size="size" :type="type" @click="handleInit(row)">初始化环境</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import tableOption from '@/const/host/cluster'

export default {
  name: 'host',
  data() {
    return {
      hostForm: {},
      option: tableOption,
      form: {},
      data: []
    }
  },
  created() {

  },
  methods: {
    handleRowSave(row, done, loading) {
      this.data.push(row);
      done();
    },
    /**
     * 环境初始化
     * @param row
     */
    handleInit(row) {
      console.log(row);
      this.$confirm('确认初始化环境?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$prompt('验证码', '身份验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function (val) {
            if (!val) {
              return false;
            }
            if (val.length == 6) {
              return true;
            }
            return false;
          },
          inputErrorMessage: '请输入6位验证码'
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '你输入的验证码是: ' + value
          });
        })
      })
    },
  }

}
</script>