<template>
  <basic-container>
    <avue-steps  :option="option" @change="change" @submit="submit">
      <template slot="before">
        <el-tag>卡槽头部{{type}}</el-tag>
      </template>
      <template slot="info">
        <avue-form :option="item.option" v-model="form"></avue-form>
      </template>
      <template slot="pwd">
        <avue-form :option="item.option" v-model="form"></avue-form>
      </template>
      <template slot="finsh">
        <avue-crud :option="item.option" :data="list"></avue-crud>
      </template>
      <template slot="after">
        <el-tag>卡槽尾部{{type}}</el-tag>
      </template>
      <template slot="menu">
        <el-button type="primary">自定义按钮</el-button>
      </template>
    </avue-steps>
  </basic-container>
</template>
<script>
import tableOption from '@/const/deploy/app'

export default {
  name: 'host',
  data() {
    return {
      type:'',
      form:'',
      item:'',
      list: [
        {
          money:'12.00',
          date:'2018-06-06',
        }, {
          money:'233.00',
          date:'2018-06-06',
        }, {
          money:'2.00',
          date:'2018-06-06',
        }, {
          money:'3.00',
          date:'2018-06-06',
        }
      ],
      option:{
        switchBtn:true,
        column: [{
          label: '填写转账信息',
          prop: 'info',
          description: '用于信息的转账',
          option: {
            formWidth:'40%',
            column: [
              {
                label: "转账金额",
                span: 24,
                prop: "money",
                size: 'small',
                prefixIcon: 'el-icon-tickets',
                rules: [{
                  required: true,
                  message: "请输入转账金额",
                  trigger: "blur"
                }]
              }
            ]
          }
        }, {
          label: '确认转账信息',
          prop: 'pwd',
          description: '为了安全再次确认转账',
          option: {
            formWidth:'40%',
            emptyBtn:false,
            column: [{
              label: "支付密码",
              prop: "password",
              type: 'password',
              size: 'small',
              span: 24,
              rules: [{
                required: true,
                message: "请输入支付密码",
                trigger: "blur"
              }],
            }]
          }
        }, {
          label: '完成',
          prop: 'finsh',
          description: '转账信息完成',
          // icon: 'el-icon-picture-outline',
          option: {
            page:false,
            index:true,
            title:'交易记录',
            column: [
              {
                label:'金额',
                prop:'money'
              }, {
                label:'时间',
                prop:'date'
              }
            ]
          }
        }]
      }
    }
  },
  created() {

  },
  methods: {},

}
</script>