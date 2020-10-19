<template>
  <basic-container>
    <p v-for="(item,index) in list" :key="index">{{ item }}</p>
  </basic-container>
</template>
<script>

export default {
  name: 'question',
  data() {
    return {
      list: [{
        question: "新增服务时，指定端口，进行服务端口映射，默认80,则不生成template，如果改变了，则生成新的配置文件",
        date: '2020-10-12',
        status: '未解决'
      },{
        question: "k8s初始化脚本，未yum update",
        date: '2020-10-15  解决时间：2020-10-16',
        status: '已解决'
      },{
        question: "批量构建和批量添加如何操作",
        date: '2020-10-16',
        status: '未解决'
      }]
    }
  },
  created() {

  },
  methods: {},
  mounted() {
    console.log(this.$router);
  }
}
</script>
