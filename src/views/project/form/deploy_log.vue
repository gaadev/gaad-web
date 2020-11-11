<template>
  <basic-container>
    <div class="tip">部署日志</div>
    <div style="margin-top: 10px;">
      <div class="wl-task-log__body">
      <pre>
        <div class="wl-task-log__line" v-for="(item,index) in detailInfo" :key="index">
<!--                    <a></a>-->
                    <span class="command" v-html="item"></span>

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
  name: 'deploy_log',
  props: {
    deployInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      detailInfo: [],
      timer: '',
      query: {
        start: null,
        logNum: null,
        serviceId: null
      }
    }
  },
  created() {
    if (this.deployInfo) {
      this.query.serviceId = this.deployInfo.serviceId || this.deployInfo.ID;
      this.query.logNum = this.deployInfo.deployNum || null;
      this.query.start = this.deployInfo.start || null;
    }
  },
  mounted() {
    this.timer = setInterval(this.getInfo, 1000);
  },
  computed: {},
  methods: {
    getInfo() {
      lookLog(this.query).then(res => {
        const isEnd = res.headers['x-text-end'];
        if (isEnd != "0") {
          clearInterval(this.timer);
          this.loading = false;
        }
        this.query.start = res.headers['x-text-lines'];
        const data = res.data;
        if (!(data == "" || data == null || data == undefined)) {
          this.detailInfo.push(data);
        }
        if (isEnd == "1") {
          this.detailInfo.push('<br/>Finished: SUCCESS');
        } else if (isEnd == "2") {
          this.detailInfo.push('<br/>Finished: UNSTABLE');
        }
      })
    }
  },
  beforeDestroy() {
    this.query = {
      start: null,
      logNum: null,
      serviceId: null
    };
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
  /*margin: 0 50px;*/
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
