<template>
  <basic-container>
    <avue-crud :option="option"
               :data="tableData" @refresh-change="handleRefreshChange" @search-change="handleSearchChange" @current-change="handleCurrentChange"
               @size-change="handleSizeChange"
               @row-save="handleRowSave" ref="crud" :page.sync="page" :table-loading="tableLoading">
      <template slot-scope="scope" slot="menuForm">
        <el-button size="small" @click="$refs.crud.closeDialog()">取消
        </el-button>
        <el-button type="primary" size="small" @click="$refs.crud.rowSave(scope.row,scope.done,scope.loading)">验证
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import tableOption from '@/const/host/index';
import {getHostList, addHost} from "@/api/host";

export default {
  name: 'host',
  data() {
    return {
      tableLoading: false,
      page: {
        pageSize: 10,
        pagerCount: 0,
        currentPage: 1,
      },
      option: tableOption,
      tableData: []
    }
  },
  created() {
    this.handleList()
  },
  methods: {
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
    handleList() {
      const params = {
        curPage: this.page.currentPage,
        pageRecord: this.page.pageSize
      };
      this.tableLoading = true;
      getHostList(params).then(res => {
        const data = res.data;
        if (data.code == 200) {
          setTimeout(() => {
            this.tableData = data.data.nodes;
            if (data.data.nodes.length > 0) {
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
        this.tableData = [];
      })
    },
    /**
     * 新增
     * @param row
     * @param done
     * @param loading
     */
    handleRowSave(row, done, loading) {
      loading();
      addHost(row).then(res => {
        const data = res.data;
        if (data.code == 200) {
          this.$message.success("添加成功");
          setTimeout(() => {
            done()
          }, 200)
        } else {
          this.$message.error(data.msg);
        }
      })
    },
    handleAddCategory() {
      this.$prompt('主机类别', '添加主机类别', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: function (val) {
          if (!val) {
            return false;
          }
          if (val.length < 0) {
            return false;
          }
          return true;
        },
        inputErrorMessage: '请输入主机类别'
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
  },

}
</script>