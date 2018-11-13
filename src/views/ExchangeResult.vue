<template>
  <div class="page response">
    <i class="icon-success"></i>
    <p class="info">提现成功<br>感谢您对分类回收作出的贡献！</p>
    <div class="detail">
      <div class="detail-list clearfix">
        <span class="title">兑换时间：</span>
        <span class="text">{{msg.time}}</span>
      </div>
      <div class="detail-list clearfix">
        <span class="title">消耗积分：</span>
        <span class="text">{{msg.pointsUsed}}</span>
      </div>
      <div class="detail-list clearfix">
        <span class="title">提现金额：</span>
        <span class="text">{{msg.money}}元</span>
      </div>
      <div class="detail-list clearfix mt50">
        <span class="title">绑定手机：</span>
        <span class="text">{{msg.mobile}}</span>
      </div>
      <div class="detail-list clearfix">
        <span class="title">剩余积分：</span>
        <span class="text">{{msg.pointsRest}}</span>
      </div>
    </div>
    <div class="return-home" @click="goHome()">返回首页</div>
  </div>
</template>

<script>

export default {
  name: 'exchangeResult',
  methods:{
    goHome(){
      this.$router.replace({name:'home'});
    }
  },
  data() {
    return {
      msg: this.$route.params
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-success{
    margin-top: 50px;
    display:inline-block;
    width: 46px;
    height: 46px;
    background: url("../assets/image/succeed.png"); 
    background-size:cover;   
    vertical-align: middle;
}

.detail-list{
    margin-bottom: 10px;
    font-size: 16px;
    vertical-align: middle;
    text-align: left;
}
.title{
  margin-left: 70px;
	color: #666666;
}

.text{
  margin-left: 20px;
	color: #333333;
}
.info{
  margin: 40px 20px 30px 20px;
  padding: 0 0 30px 0;
	font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #d8d8d8;
}


.return-home {
	margin: 55px auto 0px auto;
  width: 215px;
	height: 44px;
	line-height: 44px;
  background-color: #f3c81f;
	border-radius: 37px;
	font-size: 16px;
  color: #3e3e3e;
}

.mt50{
  margin-top:25px;
}
</style>
