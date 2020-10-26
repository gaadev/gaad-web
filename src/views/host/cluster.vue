<template>
  <basic-container>
    <avue-crud :option="option"
               :data="tableData"
               :before-open="beforeOpen"
               @refresh-change="handleRefreshChange"
               @search-change="handleSearchChange"
               @current-change="handleCurrentChange"
               @size-change="handleSizeChange"
               @row-save="handleRowSave"
               @row-update="handleRowUpdate"
               @row-del="handleRowDel"
               ref="crud" :page.sync="page" :table-loading="tableLoading">
      <template slot-scope="{row,type,size}" slot="menu">
        <el-button icon="el-icon-view" :size="size" :type="type" @click="handleAssignHost(row,'view')">查看详情</el-button>
        <el-button icon="el-icon-setting" :size="size" :type="type" @click="handleAssignHost(row,'assign')">分配主机
        </el-button>
        <el-button icon="el-icon-setting" :size="size" :type="type" @click="handleAssignHost(row,'ssh')">SSH
        </el-button>
        <el-button icon="el-icon-share" :size="size" :type="type" @click="handleInit(row)">初始化环境</el-button>
      </template>
      <template slot="status" slot-scope="scope">
        <el-tag :type="scope.row.status==2?'danger':'success'">{{ scope.row.$status }}</el-tag>
      </template>
    </avue-crud>
    <el-dialog :title="assignHostForm.type=='view'?'查看详情':'分配主机'"
               :visible.sync="assignHostForm.hostDialogVisible"
               width="60%" append-to-body :before-close="handleHostClose">
      <HostForm v-if="assignHostForm.hostDialogVisible&&assignHostForm.type=='assign'"
                v-model="assignHostForm.info"></HostForm>
      <ClusterView v-if="assignHostForm.hostDialogVisible&&assignHostForm.type=='view'"
                   v-model="assignHostForm.info"></ClusterView>
<!--      <ssh v-if="assignHostForm.hostDialogVisible&&assignHostForm.type=='ssh'"></ssh>-->
    </el-dialog>
  </basic-container>
</template>
<script>
import tableOption from '@/const/host/cluster'
import {getClusterPage, addCluster, updateCluster, deleteCluster, initCluster} from "@/api/host";
import HostForm from './form/host_form'
import ClusterView from './form/cluster_view'

export default {
  name: 'host',
  components: {
    HostForm, ClusterView
  },
  data() {
    return {
      type: '',
      assignHostForm: {
        hostDialogVisible: false,
        info: {},
        type: 'assign'
      },
      tableLoading: false,
      page: {
        pageSize: 10,
        pagerCount: 0,
        currentPage: 1,
      },
      option: tableOption,
      tableData: [],
      selectParams: {
        clusterName: null,
      }
    }
  },
  created() {
    this.handleList()
  },
  methods: {
    beforeOpen(done, type) {
      this.type = type;
      done()
    },
    /**
     * 刷新按钮触发该事件
     */
    handleRefreshChange(page) {
      this.page.currentPage = 1;
      this.handleList();
    },
    /**
     * 搜索按钮触发事件
     */
    handleSearchChange(params, done) {
      this.page.currentPage = 1;
      this.selectParams.clusterName = params.clusterName;
      this.handleList();
      setTimeout(() => {
        done();
      }, 1000);
    },
    /**
     *切换页面时触发该事件
     */
    handleCurrentChange(page) {
      this.page.currentPage = page;
      this.handleList();
    },
    /**
     * 页面每页显示的条数触发该事件
     */
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.page.currentPage = 1;
      this.handleList();
    },
    /**
     * 查询列表
     */
    handleList(val) {
      if (val != null && val == 'init') {
        this.page.currentPage = 1;
      }
      const params = {
        curPage: this.page.currentPage,
        pageRecord: this.page.pageSize,
        clusterName: this.selectParams.clusterName
      }
      this.tableLoading = true;
      getClusterPage(params).then(res => {
        const data = res.data;
        if (data.code == 200) {
          // setTimeout(() => {
          this.tableData = data.data.data;
          if (data.data.data.length > 0) {
            this.page = {
              total: data.data.total,
              pageSize: data.data.pageRecord,
              currentPage: data.data.curPage
            };
          }
          this.tableLoading = false;
          // }, 200);
        } else {
          this.tableLoading = false;
        }
      }).catch(err => {
        this.tableLoading = false;
      })
    },

    handleRowSave(row, done, loading) {
      loading();
      addCluster(row).then(res => {
        const data = res.data;
        if (data.code == 200) {
          this.$message.success("添加成功");
          this.handleList('init');
          setTimeout(() => {
            done()
          }, 200)
        } else {
          this.$message.error(data.msg);
        }
      })
    },
    /**
     * 更新集群
     * @param row
     * @param index
     * @param done
     * @param loading
     */
    handleRowUpdate(row, index, done, loading) {
      loading();
      this.$delete(row,'CreatedAt');
      this.$delete(row,'UpdatedAt');
      this.$delete(row,'DeletedAt');
      updateCluster(row).then(res => {
        const data = res.data;
        if (data.code == 200) {
          this.$message.success("更新成功");
          this.handleList('init');
          setTimeout(() => {
            done()
          }, 200)
        } else {
          this.$message.error(data.msg);
        }
      })
    },
    /**
     * 删除集群
     * @param row
     * @param index
     */
    handleRowDel(row, index) {
      this.$confirm('确认删除当前集群?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$delete(row,'CreatedAt');
        this.$delete(row,'UpdatedAt');
        this.$delete(row,'DeletedAt');
        deleteCluster(row).then(res => {
          const data = res.data;
          if (data.code == 200) {
            this.$message.success("删除成功");
            this.handleList('init');
          } else {
            this.$message.error(data.msg);
          }
        })
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 环境初始化
     * @param row
     */
    handleInit(row) {
      this.$confirm('确认初始化环境?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        initCluster(row).then(res => {
          const data = res.data;
          if (data.code == 200) {
            this.$message.success("删除成功");
            this.handleList('init');
          } else {
            this.$message.error(data.msg);
          }
        })
        // this.$prompt('验证码', '身份验证', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputValidator: function (val) {
        //     if (!val) {
        //       return false;
        //     }
        //     if (val.length == 6) {
        //       return true;
        //     }
        //     return false;
        //   },
        //   inputErrorMessage: '请输入6位验证码'
        // }).then(({value}) => {
        //   this.$message({
        //     type: 'success',
        //     message: '你输入的验证码是: ' + value
        //   });
        // })
      })
    },
    /**
     * 分配主机
     */
    handleAssignHost(row, type) {
      this.assignHostForm.info = row;
      this.assignHostForm.type = type;
      this.assignHostForm.hostDialogVisible = true;
    },
    /**
     * 分配主机-关闭弹窗
     */
    handleHostClose() {
      this.assignHostForm.clusterId = null;
      this.assignHostForm.hostDialogVisible = false;
    }
  }
}
</script>
