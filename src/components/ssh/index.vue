<template>
  <div style="height: 100%;" class="console">
    <div ref="terminal"></div>
  </div>
</template>

<script>
import {Terminal} from 'xterm'
import {AttachAddon} from 'xterm-addon-attach';
import {FitAddon} from "xterm-addon-fit";
import 'xterm/css/xterm.css'
import {Base64} from 'js-base64';
import {wsUrl} from '@/config/env';

export default {
  name: 'Console',
  props: {
    info: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      term: null,
      terminalSocket: null,
      sshInfo: {},
      rows: 80,
      cols: 100,
      fitAddon: null,
      timer: null,
    }
  },
  created() {
    this.sshInfo = this.info;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.cols = parseInt(width / 9, 10);
    this.rows = parseInt(height / 17, 10);
  },
  mounted() {
    let _this = this;

    // 获取容器宽高/字号大小，定义行数和列数
    _this.term = new Terminal({
      rendererType: "canvas", //渲染类型
      // rows: 80, //行数
      // cols: _this.cols, // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, //启用时，光标将设置为下一行的开头
      // cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
      // scrollback: 10,//终端中的回滚量
      disableStdin: false, //是否应禁用输入。
      cursorStyle: 'underline', //光标样式
      cursorBlink: true, //光标闪烁
      theme: {
        foreground: "#7e9192", //字体
        background: "#002833", //背景色
        cursor: "help", //设置光标
        lineHeight: 16
      }
    });
    _this.fitAddon = new FitAddon();
    _this.term.loadAddon(_this.fitAddon);
    _this.term.open(_this.$refs['terminal']);
    _this.fitAddon.fit();

    _this.term.onData(_this.sendCmd);
    window.addEventListener("resize", _this.resizeScreen);

    const uri = wsUrl + '/ws/shellConnect?id=' + this.sshInfo.ID + '&cols=' + parseInt(_this.cols) + '&rows=' + _this.rows
    _this.terminalSocket = new WebSocket(uri);
    _this.terminalSocket.onopen = _this.runRealTerminal;
    _this.terminalSocket.onclose = _this.closeRealTerminal;
    _this.terminalSocket.onerror = _this.errorRealTerminal;
    const attachAddon = new AttachAddon(_this.terminalSocket, {"bidirectional": false});
    // Attach the socket to term
    _this.term.loadAddon(attachAddon);

  },
  methods: {
    runRealTerminal() {
      console.log('webSocket is finished')
      this.timer= setInterval(this.sendHeart, 3000);
    },
    sendHeart() {
      const params = {
        type: 'heartbeat',
        data: ''
      }
      this.terminalSocket.send(JSON.stringify(params));
    },
    errorRealTerminal() {
      console.log('error')
    },
    closeRealTerminal() {
      this.$message.info("与服务器断开连接")
      console.log('close')
    },
    sendCmd(key) {
      const params = {
        type: 'cmd',
        cmd: Base64.encode(key)
      }
      this.terminalSocket.send(JSON.stringify(params));
    },
    resizeScreen() {
      // 不传size
      try {
        // this.fitAddon.fit();
        const height = window.innerHeight;
        this.rows = parseInt(height / 17, 10);
        // 窗口大小改变时触发xterm的resize方法，向后端发送行列数，格式由后端决定
        // 这里不使用size默认参数，因为改变窗口大小只会改变size中的列数而不能改变行数，所以这里不使用size.clos,而直接使用获取我们根据窗口大小计算出来的行列数
        this.term.onResize(() => {
          const params = {
            type: 'resize',
            rows: this.rows,
            cols: this.term.cols
          }
          this.terminalSocket.send(JSON.stringify(params));
        });
      } catch (e) {
        console.log("e", e.message);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    if (this.terminalSocket) {
      this.terminalSocket.close();
    }
    this.term.dispose();
  }
}
</script>
