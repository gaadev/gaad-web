<template>
  <basic-container>
    <avue-crud :option="option"
               :data="tableData"
               ref="crud" :table-loading="tableLoading">
      <template slot="status" slot-scope="scope">
        <el-tag :type="scope.row.status==2?'danger':'success'">{{ scope.row.$status }}</el-tag>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" icon="el-icon-view" plain size="small" @click.stop="handleSeeSevices(scope.row)">查看日志
        </el-button>
      </template>
    </avue-crud>
    <el-drawer
        title="日志查看"
        :visible.sync="deployLog.dialogVisible"
        direction="rtl"
        size="50%"
        append-to-body
        :before-close="handleDeployLogClose" style="overflow:auto">
      <DeployLog v-if="deployLog.dialogVisible" :deploy-info="deployLog.deployInfo"></DeployLog>
    </el-drawer>
  </basic-container>
</template>
<script>
import tableOption from '@/const/project/deploy_record'

import {lookDeployRecord} from "@/api/project/service";
import DeployLog from "./deploy_log"

export default {
  name: 'deploy_record',
  components: {
    DeployLog
  },
  props: {
    serviceId: {
      type: Number
    }
  },
  data() {
    return {
      option: tableOption,
      tableLoading: false,
      query: {
        serviceId: null
      },
      tableData: [],
      deployLog: {
        dialogVisible: false,
        deployInfo: {}
      },
    }
  },
  created() {
    this.query.serviceId = this.serviceId
    this.handleList();
  },
  methods: {
    handleSeeSevices(row) {
      this.deployLog.deployInfo = row;
      this.deployLog.dialogVisible = true;
    },
    handleDeployLogClose() {
      this.deployLog.dialogVisible = false;
    },
    /**
     * 查询列表
     */
    handleList() {
      this.tableLoading = true;
      lookDeployRecord(this.query).then(res => {
        const data = res.data;
        if (data.code == 200) {
          setTimeout(() => {
            this.tableData = data.data;
            this.tableLoading = false;
          }, 1000);
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },
  },

}
</script>
<style scoped>
/deep/ .el-dialog__body {
  padding: 0px 20px !important;
}

/deep/ .el-drawer__body {
  overflow: auto;
}

</style>
