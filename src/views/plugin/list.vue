<template>
  <basic-container>
    <avue-card :option="option" :data="data" @row-click="tip" @row-add="handleAdd">
      <template slot="menu" slot-scope="scope">
        <span @click.stop="tip(scope.row,scope.index)">install</span>
        <span @click.stop="tip(scope.row,scope.index)">uninstall</span>
      </template>
    </avue-card>
    <el-dialog :title="addForm.type=='add'?'新增':'修改'"
               :visible.sync="addForm.dialogVisible"
               width="60%" append-to-body>
      <avue-form ref="form" :option="addForm.formOption" v-model="form">
        <template slot-scope="scope" slot="pluginParams">
          <Editor v-model="form.pluginParams"></Editor>
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import formOption from '@/const/plugin/form'
import Editor from '@/components/editor/index'

export default {
  name: 'plugin',
  components: {
    Editor
  },
  data() {
    return {
      form: {},
      addForm: {
        dialogVisible: false,
        type: 'add',
        formOption: formOption,
        editorConfig: {
          language: 'yaml',
          theme: 'xcode',
        }
      },
      option: {
        // addBtn:false,
        props: {
          img: 'img',
          title: 'title',
          info: 'text',
        }
      },
      data: [{
        title: 'Alipay',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'
      }, {
        title: 'Angular',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'
      }, {
        title: 'Ant Design',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
      }, {
        title: 'Ant Design Pro',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'
      }, {
        title: 'Bootstrap',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
      }, {
        title: 'React',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'
      }, {
        title: 'Vue',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png'
      }, {
        title: 'Webpack',
        text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
      }]
    }
  },
  methods: {
    tip(row, index) {
      this.$message.success('查看控制台')
      console.log(row, index)
    },
    handleAdd() {
      this.addForm.dialogVisible = true;
      this.addForm.type = 'add';
    }
  }


}
</script>

