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
      <el-row>
        <el-col>
          <el-form-item>
            <el-button type="success" :loading="true">开始</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tip">部署进度</div>
    <el-steps :active="3" finish-status="success" :align-center="true">
      <el-step v-for="(item,index) in option" :key="index" :title="item.titel"></el-step>
    </el-steps>
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
      </pre>
      </div>
    </div>
  </basic-container>
</template>
<script>

export default {
  name: 'deploy',
  data() {
    return {
      testInfo: {},
      detailInfo: [{
        context: "[root@127.0.0.1]$ devops run java --git-url \"http://www.gaad.io/foo.git\" foo"
      }, {
        context: "➜ 开始使用git拉取代码,当前分支:test"
      }, {
        context: "Cloning into '/tmp/devops/unsun/efbf2732-1e41-424f-8085-3f2e16cf8b94'."
      }, {
        context: "➜ 开始使用gradle构建项目"
      }, {
        context: "BUILD SUCCESSFUL in 3s"
      }, {
        context: "➜ 开始java项目镜像的构建"
      }, {
        context: "Successfully built 91b29a878ce2"
      }, {
        context: "➜ 开始向harbor推送镜像"
      }, {
        context: "Successfully push"
      }, {
        context: "➜ 开始使用k8s部署服务"
      }, {
        context: "spawn bash -c cat /usr/local/devops/deploy/unsun/console-advertisement.yml | ssh root@192.168.10.234 'kubectl apply -f -'"
      }, {
        context: "Successfully deploy"
      }, {
        context: "[root@127.0.0.1]$"
      }],
      option: [{
        titel: "start deploy"
      }, {
        titel: "Deploy"
      }, {
        titel: "Successful Deploy"
      }],
      page: 1,
    }
  },
  created() {
    // this.getInfo()
  },
  computed: {},
  methods: {

    getInfo() {
      setInterval(() => {
        // test(this.page).then(res => {
        //   this.testInfo = res.data.data.data
        //   this.detailInfo = this.testInfo.split('\n');
        //   // this.page= this.page + 1;
        // });
      }, 1000)
    }

  },

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