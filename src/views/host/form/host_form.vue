<template>
  <basic-container>
    <avue-crud :data="tableData" :option="option" :page.sync="page" :table-loading="tableLoading"
               @refresh-change="handleRefreshChange"
               @search-change="handleSearchChange"
               @current-change="handleCurrentChange">
      <template slot-scope="{row,type,size}" slot="menu">
        <el-button icon="el-icon-setting" :size="size" :type="type" @click="handleUpdate(row,2)">设置为主节点</el-button>
        <el-button icon="el-icon-share" :size="size" :type="type" @click="handleUpdate(row,3)">设置为从节点</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>

import {getHostListForCluster, setNodeForCluster} from "@/api/host";

export default {
  name: 'hostForm',
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
      page: {
        pageSize: 10,
        pagerCount: 0,
        currentPage: 1,
        layout: "total,pager,prev, next",
      },
      selectParams: {
        ip: null,
      },
      tableLoading: false,
      tableData: [],
      option: {
        columnBtn: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        column: [
          {
            label: 'IP',
            prop: 'ip',
            search: true
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
      this.selectParams.ip = params.ip;
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
     * 查询列表
     */
    handleList(val) {
      if (val != null && val == 'init') {
        this.page.currentPage = 1;
      }
      const params = {
        curPage: this.page.currentPage,
        pageRecord: this.page.pageSize,
        ip: this.selectParams.ip
      }
      this.tableLoading = true;
      getHostListForCluster(params).then(res => {
        const data = res.data;
        if (data.code == 200) {
          setTimeout(() => {
            this.tableData = data.data.data;
            if (data.data.data.length > 0) {
              this.page = {
                total: data.data.total,
                pageSize: data.data.pageRecord,
                currentPage: data.data.curPage
              };
            }
            this.tableLoading = false;
          }, 1000);
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
        row.clusterId = this.clusterInfo.ID;
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
    }
  },

}
</script>