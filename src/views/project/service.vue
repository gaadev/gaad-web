<template>
  <basic-container>
    <avue-crud :option="option"
               :data="tableData"
               :before-open="beforeOpen"
               @refresh-change="handleRefreshChange"
               @search-change="handleSearchChange"
               @current-change="handleCurrentChange"
               @size-change="handleSizeChange"
               ref="crud" :page.sync="page" :table-loading="tableLoading">
      <template slot="status" slot-scope="scope">
        <el-tag :type="scope.row.status==2?'danger':'success'">{{ scope.row.$status }}</el-tag>
      </template>
      <template slot-scope="scope" slot="menuLeft">
        <el-button type="primary" icon="el-icon-plus" size="small" @click.stop="handleAdd">新 增</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" icon="el-icon-edit" plain size="small" @click.stop="handleEdit(scope.row)">编 辑
        </el-button>
        <el-button type="text" icon="el-icon-delete" plain size="small" @click.stop="handleRowDel(scope.row)">删 除
        </el-button>
        <el-button type="text" icon="el-icon-setting" plain size="small">项目配置
        </el-button>
      </template>
    </avue-crud>
    <el-dialog :title="addForm.type=='add'?'项目':'修改'"
               :visible.sync="addForm.dialogVisible"
               width="60%" append-to-body :before-close="handleFormClose">
      <avue-form ref="form" :option="formOption" v-model="form">
        <template slot-scope="scope" slot="wsCode">
          <el-input v-model="form.wsCode" placeholder="请输入应用标识" :disabled="addForm.type=='edit'"></el-input>
        </template>
        <template slot-scope="scope" slot="status">
          <el-select v-model="form.status" placeholder="请选择状态" :disabled="addForm.type=='add'">
            <el-option
                v-for="item in scope.column.dicData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template slot-scope="scope" slot="codeType">
          <el-select v-model="form.codeType" placeholder="请选择状态" @change="handleChangeSelect">
            <el-option
                v-for="item in scope.column.dicData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </template>

        <template slot="menuForm">
          <el-button type="primary" @click="handleSubmit" icon="el-icon-check" v-if="addForm.type=='add'">提 交
          </el-button>
          <el-button type="primary" @click="handleUpdate" icon="el-icon-check" v-else>更 新</el-button>
          <el-button @click="handleEmpty" icon="el-icon-delete" v-if="addForm.type=='add'">清 空</el-button>
          <el-button @click="handleFormClose" icon="el-icon-close">取 消</el-button>
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import tableOption from '@/const/project/service'
import formOption from '@/const/project/service_form'
import {createProject, pageProjects, deleteProject, updateProject} from '@/api/project/index'
import serviceForm from './form/service_form'

export default {
  name: 'service',
  components: {
    serviceForm
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
      form: {
        status: 1,
      },
      addForm: {
        dialogVisible: false,
        type: 'add'
      },
      option: tableOption,
      tableData: [],
      formOption: formOption,
      selectParams: {
        projectName: null,
        wsCode: null,
      }
    }
  },
  created() {
    this.handleList();
  },
  methods: {
    /**
     * 语言选择类型
     */
    handleChangeSelect() {
      const column = [{
        type: 'input',
        label: '参数',
        span: 12,
        tip: '一般为管理员账号或拥有所有仓库访问权限账号',
        prop: 'aa',
        required: true,
        rules: [{
          required: true,
          message: '请输入git账号'
        }]
      }, {
        type: 'input',
        label: '分支',
        span: 12,
        prop: 'vvv',
        rules: [{
          required: true,
          message: '请输入git账号密码'
        }],
        required: true
      }]
      this.formOption.group[2].column = column;
      this.formOption.group[2].display = true;
    },
    /**
     * curd 表单开启事件
     */
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
      this.selectParams.projectName = params.projectName;
      // this.selectParams.wsCode = params.wsCode;
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
        projectName: this.selectParams.projectName,
        // wsCode: this.selectParams.wsCode
      }
      this.tableLoading = true;
      pageProjects(params).then(res => {
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
     * 新增项目
     * @param form
     * @param done
     */
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          const form = this.form;
          form.clusterName = form.$clusterId;
          createProject(form).then(res => {
            const data = res.data;
            if (data.code == 200) {
              this.$message.success("添加成功");
              this.handleList('init');
              setTimeout(() => {
                this.handleFormClose();
                done()
              }, 200)
            } else {
              this.$message.error(data.msg);
            }
          }).catch(err => {
            done();
            console.log(err);
          })
          setTimeout(() => {
            done()
          }, 2000)
        }
      })
    },
    /**
     * 更新
     */
    handleUpdate() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          const form = this.form;
          form.clusterName = form.$clusterId;
          updateProject(form).then(res => {
            const data = res.data;
            if (data.code == 200) {
              this.$message.success("更新成功");
              this.handleList('init');
              setTimeout(() => {
                this.handleFormClose();
                done()
              }, 200)
            } else {
              this.$message.error(data.msg);
            }
          }).catch(err => {
            done();
            console.log(err);
          })
          setTimeout(() => {
            done()
          }, 2000)
        }
      })
    },
    /**
     * 新增
     */
    handleAdd() {
      this.form.status = 1;
      this.addForm.type = 'add';
      this.addForm.dialogVisible = true;
    },
    /**
     * 编辑
     */
    handleEdit(row) {
      this.addForm.type = 'edit';
      this.addForm.dialogVisible = true;
      this.form = row;
    },
    /**
     * 关闭
     */
    handleFormClose() {
      // this.handleEmpty()
      this.addForm.dialogVisible = false;
    },
    handleEmpty() {
      this.$refs.form.resetFields();
      this.$refs.form.resetForm();
      this.form.status = 1;
    },
    /**
     * 删除项目
     * @param row
     * @param index
     */
    handleRowDel(row, index) {
      this.$confirm("确认删除项目：" + row.projectName + "?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProject(row).then(res => {
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
/deep/ .el-dialog__body {
  padding: 0px 20px !important;
}
</style>
