<template>
  <basic-container>
    <div class="tip">项目信息</div>
    <!--    <avue-form ref="form" :option="formOption">-->
    <!--    </avue-form>-->
    <el-form>
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item label="环境："> 测试环境</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称："> 用户系统</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="构建时间："> 2020-09-25 18:00:03</el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item label="提交人："> loken</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注："> 修复部分<strong>bug</strong></el-form-item>
        </el-col>
      </el-row>
      <!--      <el-row>-->
      <!--        <el-col>-->
      <!--          <el-form-item>-->
      <!--            <el-button type="success" :loading="true">开始</el-button>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
    </el-form>
    <!--    <div class="tip">部署进度</div>-->
    <!--    <el-steps :active="3" finish-status="success" :align-center="true">-->
    <!--      <el-step v-for="(item,index) in option" :key="index" :title="item.titel"></el-step>-->
    <!--    </el-steps>-->
    <div class="tip">部署日志</div>
    <div style="margin-top: 10px;">
      <div class="wl-task-log__body">
      <pre>
<!--        <div class="wl-task-log__line" >-->
        <!--                    <a></a>-->
        <!--                    <span class="command"v-html="testInfo"></span>-->
        <!--        </div>-->
        <div class="wl-task-log__line" v-for="(item,index) in detailInfo" :key="index">
                    <a></a>
                    <span class="command">{{ item }}</span>

        </div>
        <i v-loading="loading"></i>
      </pre>

      </div>
    </div>
  </basic-container>
</template>
<script>
import {lookLog} from '@/api/project/service'

export default {
  name: 'deploy',
  data() {
    return {
      loading: true,
      testInfo: {},
      detailInfo: [{
        context: "[root@127.0.0.1]$ devops run java --git-url \"http://www.gaad.io/foo.git\" foo"
      }],
      page: 1,
      timer: '',
    }
  },
  created() {
    // this.getInfo()
  },
  mounted() {
    this.timer = setInterval(this.getInfo, 1000);
  },
  computed: {},
  methods: {
    getInfo() {
      // this.detailInfo.push(a);
      lookLog()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }

}
</script>
<style>
.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
}

.wl-task-log__body pre {
  clear: left;
  min-height: 42px;
  padding: 15px 0;
  color: #f1f1f1;
  font-family: Cousine, monospace;
  font-size: 12px;
  line-height: 19px;
  white-space: normal;
  word-wrap: break-word;
  background-color: #222;
  counter-reset: a;
  margin-top: 0;
}

.wl-task-log__body {
  position: relative;
}

.wl-task-log__line {
  position: relative;
  margin: 0 50px;
  min-height: 19px;
  white-space: normal;
  border-left: 1px solid #666;
  padding: 0 10px;
}

.wl-task-log__line a {
  display: inline-block;
  text-align: right;
  min-width: 50px;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  color: #666;
  top: 0;
  left: -50px;
}

.wl-task-log__line a:before {
  content: counter(a);
  counter-increment: a;
  padding-right: 1em;
}
</style>
