<template>
  <basic-container>
    <!--    <div><p>项目AAAA的构建文件</p></div>-->
    <el-container>
      <el-aside width="30%" style="min-height: 743px;">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
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
              <!--              <el-option-->
              <!--                  v-for="item in options"-->
              <!--                  :key="item.value"-->
              <!--                  :label="item.label"-->
              <!--                  :value="item.value">-->
              <!--              </el-option>-->
            </el-select>
          </div>
        </el-header>
        <el-main>
          <editor v-model="content" @init="editorInit" :lang="language" :options="options" :theme="theme"
                  ref="myEditor"></editor>
        </el-main>
      </el-container>
    </el-container>
  </basic-container>
</template>
<script>
//
// width="300px"
export default {
  name: 'host',
  data() {
    return {
      treeData: [{
        value: 0,
        label: '一级部门',
        children: [
          {
            value: 1,
            label: '一级部门1',
          }
        ]
      }],
      treeOption: {
        defaultExpandAll: true,
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
      language: 'yaml',
      theme: 'xcode',
      content: null,
      options: {/*vue2-ace-editor编辑器配置自动补全等*/
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,/*自动补全*/
        // readOnly: true
      },
    }
  },
  components: {
    editor: require('vue2-ace-editor'),
  },
  created() {

  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/yaml')
      require('brace/snippets/yaml')      //snippet
      require('brace/mode/dockerfile')    //language
      require('brace/snippets/dockerfile')      //snippet
      require('brace/theme/twilight')
      require('brace/theme/xcode')
    },
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