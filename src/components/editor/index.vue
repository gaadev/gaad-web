<template>
    <editorAAA v-model="content" @init="editorInit" :lang="language" :options="options"
            :theme="theme"
            ref="myEditor" height="100"
               width="100%"></editorAAA>
</template>
<script>

export default {
  name: 'editor',
  props: {
    // value: {
    //   type: String,
    //   default: null
    // }
  },
  watch: {
    // value: function (n, o) {
    //   this.content = this.value;
    // }
  },
  created() {
    // this.language = this.editorConfig.language;
    // this.theme = this.editorConfig.theme;
    // this.content = this.value;
  },
  data() {
    return {
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
    editorAAA: require('vue2-ace-editor'),
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/yaml')
      require('brace/snippets/yaml')      //snippet
      require('brace/mode/dockerfile')    //language
      require('brace/snippets/dockerfile')      //snippet
      require('brace/mode/json')    //language
      require('brace/snippets/json')      //snippet
      require('brace/theme/twilight')
      require('brace/theme/xcode')
    }
  },
}
</script>
<style scoped>
/*/deep/ .el-card__body {*/
/*  padding: 10px 20px 20px 20px;*/
/*}*/
</style>
