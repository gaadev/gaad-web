<template>
  <basic-container>
    <!--    <div><p>项目AAAA的构建文件</p></div>-->
    <el-container>
      <el-aside width="20%" style="min-height: 743px;border-right: 1px solid #E4E7ED;">
        <avue-tree :option="treeOption" :data="treeData"></avue-tree>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <div style="display: flex;justify-content: space-between">
            <div>
              <el-button icon="el-icon-plus" type="primary" @click="handleChange" size="small">新 增</el-button>
              <el-button icon="el-icon-edit" type="primary" size="small">编 辑</el-button>
              <el-button icon="el-icon-delete" type="danger" size="small">删 除</el-button>
              <el-button icon="el-icon-check" type="primary" size="small">更 新</el-button>
              <el-button icon="el-icon-check" type="primary" size="small">保 存</el-button>
              <el-button icon="el-icon-close" size="small">取 消</el-button>
            </div>
            <el-select style="right: 0px;position:relative;">
              <!--                            <el-option-->
              <!--                                v-for="item in options"-->
              <!--                                :key="item.value"-->
              <!--                                :label="item.label"-->
              <!--                                :value="item.value">-->
              <!--                            </el-option>-->
            </el-select>
          </div>
        </el-header>
        <el-main>
          <Editor :editorConfig="this.editConfig"></Editor>
        </el-main>
      </el-container>
    </el-container>
  </basic-container>
</template>
<script>
import Editor from '@/components/editor/index'

export default {
  name: 'editorForm',
  data() {
    return {
      treeData: [{
        value: 0,
        label: 'dockerfile文件',
        children: [{
          value: 1,
          label: 'dockerfile',
        }, {
          value: 2,
          label: 'jpg-cool-dockerfile',
        }]
      }, {
        value: 1,
        label: 'template文件',
        children: [{
          value: 1,
          label: 'template',
        }, {
          value: 2,
          label: 'zull-template',
        }]
      }],
      treeOption: {
        defaultExpandAll: true,
        filter: false,
        addBtn: false,
        formOption: {
          labelWidth: 100,
          column: [{
            label: '自定义项',
            prop: 'test'
          }],
        },
        props: {
          labelText: '标题',
          label: 'label',
          value: 'value',
          children: 'children'
        }
      },
      editConfig: {
        language: 'yaml',
        theme: 'twilight',
        content: null
      }
    }
  },
  components: {
    Editor
  },
  created() {

  },
  methods: {
    handleChange() {
      let editor = this.$refs.myEditor.editor
      editor.setReadOnly(false);
      this.theme = 'twilight';
      // this.options.readOnly = false;
      // this.$prompt('验证码', '身份验证', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputErrorMessage: '请输入6位验证码'
      // }).then(({value}) => {
      //   this.$message({
      //     type: 'success',
      //     message: '你输入的验证码是: ' + value
      //   });
      //   this.language = value;
      // })
    }
  },
}
</script>
<style scoped>
/deep/ .el-card__body {
  padding: 10px 20px 20px 20px;
}
</style>
