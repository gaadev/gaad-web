<template>
  <basic-container>
    <van-cell-group class="avue-cell-group">
      <div class="avue-cell">
        <van-cell :title="label"
                  :class="{'van-cell--required':required}">
          <van-switch v-model="textLabel"
                      size="20px"
                      />
        </van-cell>
      </div>
    </van-cell-group>
  </basic-container>
</template>

<script>
export default {
  name: 'serviceForm',
  data() {
    return {
      textLabel: false,
      textIndex: 0
    }
  },
  created() {
  },
  methods: {},

}
</script>
<style scoped>
/deep/ .el-collapse {
  border-top: 0px solid #EBEEF5 !important;
  border-bottom: 0px solid #EBEEF5 !important;
}
/deep/ .el-collapse-item__wrap {
  border-bottom: 0px solid #EBEEF5 !important;
}
</style>
