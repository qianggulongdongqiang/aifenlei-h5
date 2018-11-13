<template>
  <div class="page response">
    <i class="icon-success"></i>
    <p class="info">订单提交成功</p>
    <div class="goto-myorder" @click="goToMyOrder()">查看订单</div>
    <div class="return-home" @click="goHome()">继续下单</div>
  </div>
</template>

<script>

export default {
  name: 'response',
  created(){
    console.log(this.$router.query);
  },
  methods:{
    goHome(){
      this.$router.replace({name:'home'});
    },
    goToMyOrder(){
      this.$router.replace({name:'myorder'});
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-success{
    margin-top: 204px;
    display:inline-block;
    width: 46px;
    height: 46px;
    background: url("../assets/image/succeed.png"); 
    background-size:cover;   
    vertical-align: middle;
}

.info{
  margin-top: 40px;
	font-size: 16px;
	color: #333333;
}

.goto-myorder {
  margin: 44px auto 0px auto;
  width: 215px;
	height: 44px;
  line-height: 44px;
	background-color: #ffffff;
	border-radius: 37px;
	border: solid 1px #f3c81f;
  color: #3e3e3e;
  font-size: 16px;

}

.return-home {
	margin: 25px auto 0px auto;
  width: 215px;
	height: 44px;
	line-height: 44px;
  background-color: #f3c81f;
	border-radius: 37px;
	font-size: 16px;
	color: #3e3e3e;
}
</style>
