<!--<template>-->
<!--  <div id="terminal"></div>-->
<!--</template>-->
<!--<script>-->
<!--import {Terminal} from "xterm"-->

<!--export default {-->
<!--  components: {},-->
<!--  mounted() {-->
<!--    let terminalContainer = document.getElementById('terminal')-->
<!--    console.log(terminalContainer);-->
<!--    let term = new Terminal({-->
<!--      // 光标闪烁-->
<!--      cursorBlink: true-->
<!--    })-->
<!--    term.open(terminalContainer)-->
<!--    //选中 复制-->
<!--    term.on("select", function() {-->
<!--      if (term.hasSelection()) {-->
<!--        this.copy = term.getSelection();-->
<!--      }-->
<!--    });-->
<!--    term.attachCustomKeyEventHandler(function(ev) {-->
<!--      //粘贴 ctrl+v-->
<!--      if (ev.keyCode == 86 && ev.ctrlKey) {-->
<!--        websocket.send(new TextEncoder().encode("\x00" + this.copy));-->
<!--      }-->
<!--    });-->
<!--    term.writeln(-->
<!--        "******************************************************************"-->
<!--    );-->
<!--  },-->
<!--  data() {-->
<!--    return {}-->
<!--  },-->
<!--  created() {-->

<!--  },-->
<!--  methods: {},-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->


<!--</style>-->