<template>
  <basic-container>
    <avue-crud :option="option"
               :data="tableData"
               :search.sync="selectParams"
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
        <el-button type="primary" icon="el-icon-video-play" size="small" @click.stop="handleBatchBuild">批量构建</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" icon="el-icon-edit" plain size="small" @click.stop="handleEdit(scope.row)">编 辑
        </el-button>
        <el-button type="text" icon="el-icon-delete" plain size="small" @click.stop="handleRowDel(scope.row)">删 除
        </el-button>
        <el-button type="text" icon="el-icon-video-play" plain size="small" @click.stop="handleDeploy(scope.row)">立即构建
        </el-button>
        <el-button type="text" icon="el-icon-view" plain size="small" @click.stop="handleDeployRecord(scope.row)">构建记录
        </el-button>
      </template>
    </avue-crud>
    <!--新增修改-->
    <el-dialog :title="addForm.type=='add'?'新增':'修改'"
               :visible.sync="addForm.dialogVisible"
               width="60%" append-to-body :before-close="handleFormClose">
      <avue-form ref="form" :option="formOption" v-model="form">
        <template slot-scope="scope" slot="serviceCode">
          <el-input v-model="form.serviceCode" placeholder="请输入服务标识"></el-input>
        </template>
        <template slot-scope="scope" slot="gitUrl">
          <el-input v-model="form.gitUrl" placeholder="请输入代码仓库"></el-input>
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
        <template slot-scope="scope" slot="lang">
          <el-select v-model="form.lang" placeholder="请选择状态" @change="handleChangeSelect">
            <el-option
                v-for="item in scope.column.dicData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </template>
        <!--自定义菜单-->
        <template slot="menuForm">
          <el-button type="primary" @click="handleSubmit" icon="el-icon-check" v-if="addForm.type=='add'">提 交
          </el-button>
          <el-button type="primary" @click="handleUpdate" icon="el-icon-check" v-else>更 新</el-button>
          <el-button @click="handleEmpty" icon="el-icon-delete" v-if="addForm.type=='add'">清 空</el-button>
          <el-button @click="handleFormClose" icon="el-icon-close">取 消</el-button>
        </template>
      </avue-form>
    </el-dialog>
    <!--查看日志dialog-->
    <el-drawer title="日志查看"
               :visible.sync="deployForm.dialogVisible"
               direction="rtl"
               size="50%"
               append-to-body :before-close="handleDeployFormClose">
      <DeployLog v-if="deployForm.dialogVisible" :deploy-info="deployForm.deployInfo"></DeployLog>
    </el-drawer>
    <el-drawer
        title="构建记录"
        :visible.sync="deployRecord.dialogVisible"
        direction="rtl"
        size="50%"
        append-to-body
        :before-close="handleDeployRecordClose">
      <DeployRecord v-if="deployRecord.dialogVisible" :serviceId="deployRecord.serviceId"></DeployRecord>
    </el-drawer>
  </basic-container>
</template>
<script>
import tableOption from '@/const/project/service'
import formOption from '@/const/project/service_form'
import {createService, pageService, deleteService, updateService, deployService} from '@/api/project/service'
import serviceForm from './form/service_form'
import DeployLog from "./form/deploy_log"
import DeployRecord from "./form/deploy_record"

export default {
  name: 'service',
  components: {
    serviceForm, DeployLog, DeployRecord
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
      initForm: {
        status: 1,
        lang: 'java',
        gitBranch: 'master'
      },
      form: {},
      addForm: {
        dialogVisible: false,
        type: 'add'
      },
      selectLang: 'java',  //选中的语言
      option: tableOption,
      tableData: [],
      formOption: formOption,
      selectParams: {
        projectId: null,
        serviceName: null,
      },
      deployRecord: {
        dialogVisible: false,
        serviceId: null
      },
      deployForm: {
        dialogVisible: false,
        deployInfo: {}
      },
      fieldList: {
        java: [{
          type: 'input',
          label: '自定义命令',
          span: 24,
          prop: 'buildCmds',
        }, {
          type: 'input',
          label: '启动参数',
          span: 12,
          prop: 'javaOpts',
        }, {
          type: 'select',
          label: '构建工具',
          span: 12,
          prop: 'buildTool',
          dicData: [{
            label: 'Maven',
            value: 'maven'
          }, {
            label: 'Gradle',
            value: 'gradle'
          }]
        }],
        vue: [{
          type: 'input',
          label: '自定义命令',
          span: 24,
          prop: 'buildCmds',
        }, {
          type: 'input',
          label: '构建环境',
          span: 24,
          prop: 'buildEnv',
        }],
        go: [],
        python: []
      }
    }
  },
  mounted() {
    this.selectParams.projectId = this.$route.query.projectId;
  },
  created() {
    this.handleList();
  },
  methods: {
    /**
     * 语言选择类型
     */
    handleChangeSelect(value, type) {
      if (type !== "editInit") {
        this.removeParam(this.selectLang);
      }
      let column = [];
      if (value == 'java') {
        column = this.fieldList.java;
      } else if (value == 'vue') {
        column = this.fieldList.vue;
      }
      this.selectLang = value;
      this.formOption.group[1].column = column;
      this.formOption.group[1].display = true;
    },
    /**
     * 删除表单里面的值
     */
    removeParam(lang) {
      const column = this.fieldList[lang];
      column.forEach(s => {
        this.$delete(this.form, s.prop);
      });
    },
    /**
     * 构建服务
     */
    handleDeploy(row) {
      this.$confirm("确认构建？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$delete(row, 'CreatedAt');
        this.$delete(row, 'UpdatedAt');
        this.$delete(row, 'DeletedAt');
        deployService(row).then(res => {
          const data = res.data;
          if (data.code == 200) {
            // this.$message.success("构建成功");
            this.handleList('init');
            setTimeout(() => {
              const deployInfo = {
                serviceId: row.ID,
                start: 1
              }
              this.deployForm.deployInfo = deployInfo;
              this.deployForm.dialogVisible = true;
            }, 200);
          } else {
            this.$message.error(data.msg);
          }
        })
      }).catch(() => {
      })
    },
    /**
     * open deploy record dialog
     */
    handleDeployRecord(row) {
      this.deployRecord.serviceId = row.ID;
      this.deployRecord.dialogVisible = true;
    },
    /**
     * close deploy record dialog
     */
    handleDeployRecordClose() {
      this.deployRecord.serviceId = null;
      this.deployRecord.dialogVisible = false;
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
    handleRefreshChange() {
      this.page.currentPage = 1;
      this.handleList();
    },
    /**
     * 搜索按钮触发事件
     */
    handleSearchChange(params, done) {
      this.page.currentPage = 1;
      this.selectParams.serviceName = params.serviceName;
      this.selectParams.projectId = params.projectId;
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
        serviceName: this.selectParams.serviceName,
        projectId: this.selectParams.projectId
      }
      this.tableLoading = true;
      pageService(params).then(res => {
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
      }).catch(() => {
        this.tableLoading = false;
      })
    },
    /**
     * 参数处理转换成json字符串
     */
    paramsCovtorToString(form) {
      const columnList = this.fieldList[form.lang];
      const devoopsOpts = {};
      columnList.forEach(s => {
        devoopsOpts[s.prop] = form[s.prop];
      });
      return JSON.stringify(devoopsOpts);
    },
    /**
     * 将json字符串转换成对象
     */
    paramsCovtorToObject() {
      const columnList = this.fieldList[this.form.lang];
      if (this.form.devopsOpts) {
        const params = JSON.parse(this.form.devopsOpts);
        columnList.forEach(s => {
          this.form[s.prop] = params[s.prop];
        });
      }
    },
    /**
     * 新增服务
     * @param form
     * @param done
     */
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          const form = this.form;
          form.projectName = form.$projectId;
          form.devopsOpts = this.paramsCovtorToString(form);
          createService(form).then(res => {
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
          form.devopsOpts = {}
          this.$delete(form, 'CreatedAt');
          this.$delete(form, 'UpdatedAt');
          this.$delete(form, 'DeletedAt');
          form.devopsOpts = this.paramsCovtorToString(form);
          updateService(form).then(res => {
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
      this.form = this.initForm;
      this.handleChangeSelect(this.form.lang)
      this.addForm.type = 'add';
      this.addForm.dialogVisible = true;
    },
    /**
     * 批量构建
     */
    handleBatchBuild() {
      this.$message.info("功能开发中");
    },
    /**
     * 编辑
     */
    async handleEdit(row) {
      //触发改变
      this.handleChangeSelect(row.lang, "editInit");
      this.form = row;
      this.paramsCovtorToObject();
      this.addForm.type = 'edit';
      this.addForm.dialogVisible = true;
    },
    /**
     * 关闭
     */
    handleFormClose() {
      this.handleEmpty();
      this.addForm.dialogVisible = false;
    },
    handleDeployFormClose() {
      this.deployForm.deployInfo = {};
      this.deployForm.dialogVisible = false;
    },
    handleEmpty() {
      this.$refs.form.resetFields();
      this.$refs.form.resetForm();
    },
    /**
     * 删除项目
     * @param row
     * @param index
     */
    handleRowDel(row) {
      this.$confirm("确认删除服务：" + row.serviceName + "?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$delete(row, 'CreatedAt');
        this.$delete(row, 'UpdatedAt');
        this.$delete(row, 'DeletedAt');
        deleteService(row).then(res => {
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

/deep/ .el-drawer__body {
  overflow: auto;
}
</style>
