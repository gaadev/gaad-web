<template>
  <!--  <basic-container>-->
  <div class="index-container">
    <div class="index-container__main">
      <div class="index-home">
        <div class="index-about">
          <div class="index-about__row">
            <h1 class="index-about__title">
              Git as a DevOps(GAAD)
            </h1>
          </div>
          <div class="index-about__row">
            <div class="index-about__strong">
              <p>为微服务设计而生、
                数以万计微的服务、
                支持多种编排平台、
                多变的个性化配置、
                一处构建多处部署、
                原生对命令行支持、
                多种语言环境构建、
                批量配置批量构建<br/>
                我们期望打造一个比 jenkins 更为好用的的部署平台，愿 GAAD 能真真切切为你解决 DevOps 的问题
              </p>
            </div>
          </div>
          <div class="index-about__row">
            <a href="https://gaad.io/" target="_blank" class="index-about__gaad">官网 (gaad.io)</a> &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="https://gitee.com/gaad/gaad" target="_blank" class="index-about__gaad">gitee (gaad)</a>
          </div>
          <div class="index-about__footer">
            如果喜欢，请不吝为我们github项目点个星<a href="https://gitee.com/gaad/gaad" target="_blank">star</a>，关注公众号 <a
              href="http://gaad.io" target="_blank">GAAD</a> 了解更多
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  </basic-container>-->
</template>

<script>

export default {
  name: "wel",
  data() {
    return {};
  },
  computed: {},
  created() {
  },
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
a {
  text-decoration: none;
  border: none;
  outline: none;
}

.index-container {
  height: 100%;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: auto;
}

.index-container__main {
  min-width: 1200px;
  height: 100%;
  overflow: auto;
}

.index-home {
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  background-size: cover;
  background-image: url('/img/bg/login.png');
  position: relative;
  overflow: auto;
}

.index-about {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: auto;
}

.index-about__row {
  display: -ms-flexbox;
  display: flex;
  color: #606266;
  padding: 15px 0;
  font-size: 14px;
  -ms-flex-pack: center;
  justify-content: center;
}

.index-about__title {
  font-size: 22px;
  line-height: 30px;
  font-weight: 500;
}

.index-about__strong {
  text-align: center;
  margin: 10px auto;
}

.index-about__strong p {
  line-height: 30px;
  font-size: 18px;
  width: 800px;
}

.index-about__gaad {
  color: #409eff;
  font-size: 16px;
}

.index-about__footer {
  position: absolute;
  bottom: 40px;
  text-align: center;
  width: 100%;
  color: #909399;
}

.index-about__footer a {
  color: #409eff;
  margin: 0 4px;
}
</style>
