<template>
  <div class="page response">
    <i class="icon-success"></i>
    <p class="result">账号登录成功</p>
    <p class="msg">请在回收设备上确认账号信息后<br>
继续投递操作</p>
    <div class="close-btn" @click="closeWindow()">返回公众号</div>
  </div>
</template>

<script>

export default {
  name: 'bindResult',
  created(){
    console.log(this.$router.query);
  },
  methods:{
    closeWindow(){
      WeixinJSBridge.call('closeWindow');
    },
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-success{
    margin-top: 105px;
    display:inline-block;
    width: 70px;
    height: 70px;
    background: url("../assets/image/succeed.png"); 
    background-size:cover;   
    vertical-align: middle;
}

.result{
  margin-top: 23px;
	font-size: 20px;
	color: #333333;
}

.msg{
  font-size: 16px;
	color: #666666;
}

.close-btn {
  margin: 80px auto 0px auto;
	width: 215px;
	height: 44px;
  line-height: 44px;
	background-color: #f3c81f;
	border-radius: 37px;
  font-size: 16px;
	color: #3e3e3e;

}
</style>
