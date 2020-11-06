<template>
  <basic-container>
    <el-container>
      <el-aside width="200px">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
      </el-aside>
      <el-main>
        <el-tabs type="border-card" active-name="1">
          <el-tab-pane name="1">
            <span slot="label">环境变量</span>
            <avue-crud :option="option" style="top:10px;" :data="tableData">
              <template slot="icon" slot-scope="scope">
                <i :class="scope.row.icon"></i>
              </template>
            </avue-crud>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">模板管理</span>
<!--            <el-container>-->
<!--              <el-aside width="200px">-->
<!--                <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>-->
<!--              </el-aside>-->
<!--              <el-main>-->
                <Editor></Editor>
<!--              </el-main>-->
<!--            </el-container>-->
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </basic-container>
</template>

<script>
import tableOption from '@/const/project/env'
import Editor from './form/editor_form'
export default {
  components:{
    Editor
  },
  data() {
    return {
      obj: {},
      treeData: [
        {
          value: 0,
          label: '教师云',
          children: []
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
      data: [],
      data0: [
        {
          name: '张三',
          sex: '男'
        },
        {
          name: '李四',
          sex: '女'
        }
      ],
      data1: [
        {
          name: '张三1',
          sex: '男'
        },
        {
          name: '李四2',
          sex: '女'
        }
      ],
      option: tableOption,
      tableData: [{
        name: 'java',
        version: '1.8.1',
        path: '/jdk/1.8',
        icon: 'icon-java'
      }, {
        name: 'node',
        version: '12.19.0',
        path: '/node/12.19.0',
        icon: 'icon-Nodejs'
      }, {
        name: 'python',
        version: '3.8.5',
        path: '/python/3.8.5',
        icon: 'icon-python'
      }, {
        name: 'go',
        version: '15.1',
        path: '/go/15.1',
        icon: 'icon-go'
      }, {
        name: 'maven',
        version: '3.6.3',
        path: '/maven/3.6.3',
        icon: 'icon-m',
      }, {
        name: 'gradle',
        version: '6.4.1',
        path: '/gradle/6.4.1',
        icon: 'icon-gradle',
      }]
    }
  },
  created() {
    this.data = this.data0;
  },
  methods: {
    nodeClick(data) {
      if (data.id == 0) {
        this.data = this.data0;
      } else if (data.id == 1) {
        this.data = this.data1;
      }
      this.$message.success(JSON.stringify(data))
    }
  }
}
</script>
<style scoped>

</style>
