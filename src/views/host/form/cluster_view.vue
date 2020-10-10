<template>
  <basic-container>
    <el-form v-model="clusterInfo" inline label-width="100px">
      <el-row :span="24">
        <el-col :span="12">
          <el-form-item label="集群名称:">
            <span class="cluster-view">{{ clusterInfo.clusterName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="集群类型:">
            <span class="cluster-view">{{ clusterInfo.category }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="12">
          <el-form-item label="状态:">
            <span class="cluster-view"><el-tag
                :type="clusterInfo.status == 1?'success':'info' ">{{ clusterInfo.status == 1 ? '可用' : '不可用' }}</el-tag></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:">
            <span class="cluster-view">{{ clusterInfo.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="avue-group__header"><i class="fa fa-rocket avue-group__icon"></i>
        <h1 class="avue-group__title">主机信息</h1></div>
      <el-row :span="24">
        <avue-crud :data="tableData" :option="option" :page.sync="page" :table-loading="tableLoading"
                   @current-change="handleCurrentChange">
          <template slot="nodeType" slot-scope="scope">
            <el-tag :type="scope.row.nodeType==2?'success':'warning'">{{ scope.row.$nodeType }}</el-tag>
          </template>
          <template slot-scope="{row,type,size}" slot="menu">
            <el-button icon="el-icon-setting" :size="size" :type="type" @click="handleRemoveNode(row)"
                       :loading="btnLoading">移除节点
            </el-button>
          </template>
        </avue-crud>
      </el-row>
    </el-form>
  </basic-container>
</template>
<script>
import {getNodesForCluster, removeNodeForCluster} from '@/api/host/index'

export default {
  name: 'ClusterView',
  props: {
    value: {
      type: Object,
      default: {}
    },
  },
  watch: {
    value: function (n, o) {
      this.clusterInfo = this.value;
    }
  },
  data() {
    return {
      clusterInfo: {},
      btnLoading: false,
      page: {
        pageSize: 10,
        pagerCount: 0,
        currentPage: 1,
        layout: "total,pager,prev, next",
      },
      tableLoading: false,
      tableData: [],
      option: {
        align: 'center',
        columnBtn: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        refreshBtn: false,
        column: [
          {
            label: 'IP',
            prop: 'ip'
          },
          {
            label: '类型',
            prop: 'nodeType',
            type: 'select',
            slot: true,
            dicData: [{
              label: '主机节点',
              value: 1
            }, {
              label: 'master',
              value: 2
            }, {
              label: 'slave',
              value: 3
            }]
          },
          {
            label: '备注',
            prop: 'remark'
          }
        ]
      }
    }
  },
  created() {
    this.clusterInfo = this.value;
    this.handleList();
  },
  methods: {
    beforeOpen(done, type) {
      this.type = type;
      done()
    },
    /**
     *切换页面时触发该事件
     */
    handleCurrentChange(page) {
      this.page.currentPage = page;
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
        clusterId: this.clusterInfo.ID
      }
      this.tableLoading = true;
      getNodesForCluster(params).then(res => {
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
          // }, 1000);
        } else {
          this.tableLoading = false;
        }
      }).catch(err => {
        this.tableLoading = false;
      })
    },
    /**
     * 设置集群节点
     * @param row
     * @param type 2 集群主节点  3集群从节点
     */
    handleUpdate(row, type) {
      this.$confirm("确认设置为" + (type == 2 ? '主节点' : '从节点') + "?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.nodeType = type;
        row.clusterId = this.clusterId;
        setNodeForCluster(row).then(res => {
          const data = res.data;
          if (data.code == 200) {
            this.$message.success("操作成功");
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
     * 移除节点
     * @param row
     */
    handleRemoveNode(row) {
      this.btnLoading = true;
      this.$confirm('确认移除该节点', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeNodeForCluster(row).then(res => {
          const data = res.data;
          if (data.code == 200) {
            this.$message.success("操作成功");
            this.handleList('init');
          } else {
            this.$message.error(data.msg);
          }
          this.btnLoading = false;
        })
      }).catch(err => {
        console.log(err);
        this.btnLoading = false;
      })
    }
  },
}
</script>
<style scoped>
.cluster-view {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  /* color: #C0C4CC; */
  cursor: not-allowed;
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  /*width: 100%;*/
}

/deep/ .avue-crud__menu {
  display: none !important;
}


</style>