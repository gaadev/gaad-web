<template>
  <basic-container>
    <el-tabs type="border-card" v-model="editableTabsValue" closable @tab-remove="removeTab">
      <el-tab-pane name="1">
        <span slot="label">主机列表</span>
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
          <template slot-scope="scope" slot="menuForm">
            <el-button size="small" @click="$refs.crud.closeDialog()">取消
            </el-button>
            <el-button type="primary" size="small" v-if="type=='add'"
                       @click="$refs.crud.rowSave(scope.row,scope.done,scope.loading)">新增
            </el-button>
            <el-button type="primary" size="small" v-if="type=='edit'"
                       @click="$refs.crud.rowUpdate(scope.row,scope.done,scope.loading)">更新
            </el-button>
          </template>
          <template slot-scope="scope" slot="menu">
            <el-button icon="el-icon-setting" size="small" type="text" @click.stop="handleSSH(scope.row)">SSH
            </el-button>
          </template>
          <template slot="status" slot-scope="scope">
            <el-tag :type="scope.row.status==2?'danger':'success'">{{ scope.row.$status }}</el-tag>
          </template>
          <template slot="status" slot-scope="scope">
            <el-tag :type="scope.row.status==2?'danger':'success'">{{ scope.row.$status }}</el-tag>
          </template>
        </avue-crud>
      </el-tab-pane>
      <el-tab-pane
          :key="item.name"
          v-for="(item, index) in sshList"
          :label="item.title"
          :name="item.name"
      >
        <component :is="item.content" :info="item.info"></component>
<!--        <SSH :info="item.info" ></SSH>-->
      </el-tab-pane>
    </el-tabs>

  </basic-container>
</template>
<script>
import tableOption from '@/const/host/index';
import {getHostList, addHost, updateHost, deleteHost} from "@/api/host";
import SSH from '@/components/ssh/index'

export default {
  name: 'host',
  components: {
    SSH
  },
  data() {
    return {
      type: '',
      tableLoading: false,
      page: {
        pageSize: 10,
        pagerCount: 0,
        currentPage: 1,
      },
      sshList: [],
      editableTabsValue: '1',
      tabIndex: 1,
      option: tableOption,
      tableData: [],
      selectParams: {
        ip: null,
      }
    }
  },
  created() {
    this.handleList()
  },
  methods: {
    handleSSH(row) {
      let newTabName = ++this.tabIndex + ''
      this.sshList.push({
        title: ':' + row.ip,
        name: newTabName,
        content: 'SSH',
        info: row
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      let tabs = this.sshList;
      let activeName = this.editableTabsValue;
      this.editableTabsValue = '1';
      this.sshList = tabs.filter(tab => tab.name !== targetName);
    },
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
        ip: this.selectParams.ip
      }
      this.tableLoading = true;
      getHostList(params).then(res => {
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
     * 新增
     * @param row
     * @param done
     * @param loading
     */
    handleRowSave(row, done, loading) {
      loading();
      if (row.clusterId == '' || row.clusterId == null) {
        row.clusterId = 0;
        row.clusterName = row.$clusterId;
      }
      addHost(row).then(res => {
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
     * 更新主机
     * @param row
     * @param index
     * @param done
     * @param loading
     */
    handleRowUpdate(row, index, done, loading) {
      loading();
      if (row.clusterId == '' || row.clusterId == null) {
        row.clusterId = 0;
        row.clusterName = row.$clusterId;
      }
      this.$delete(row,'CreatedAt');
      this.$delete(row,'UpdatedAt');
      this.$delete(row,'DeletedAt');
      updateHost(row).then(res => {
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
     * 删除主机
     * @param row
     * @param index
     */
    handleRowDel(row, index) {
      this.$confirm('确认删除当前主机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$delete(row,'CreatedAt');
        this.$delete(row,'UpdatedAt');
        this.$delete(row,'DeletedAt');
        deleteHost(row).then(res => {
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
  },

}
</script>
<style scoped>
/deep/ .el-tabs--border-card {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: none !important;
}
</style>
