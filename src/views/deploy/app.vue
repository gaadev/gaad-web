<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data">
    </avue-crud>
  </basic-container>
</template>
<script>
import tableOption from '@/const/deploy/app'

export default {
  name: 'host',
  data() {
    return {
      option: tableOption,
      form:{},
      data:[]
    }
  },
  created() {

  },
  methods: {},

}
</script>