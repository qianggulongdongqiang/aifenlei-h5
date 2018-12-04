<template>
    <div class="page exchange-confirm">
        <div class="form-group">
            <div class="cell clearfix">
                <span class="cell-title left">账号手机</span>
                <span class="mobile">18817777388</span>
                <span class="button captcha right" @click="getCaptcha()" v-bind:class="{'active': !waiting}">{{captchaText}}</span>
            </div>
            <div class="cell clearfix">
                <span class="cell-title left">验证码</span>
                <input type="text" v-model="captcha" placeholder="请输入验证码" class="captcha input">
            </div>
        </div>
        <div class="button submit" @click="submit()" v-bind:class="{'active': validForm}">提交</div>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script>

export default {
  name: 'exchangeConfirm',
  created(){

  },
  computed:{
    validMobile(){
        return this.mobile && this.mobile.length === 11;
      },
      validForm(){
        return this.validMobile && this.captcha;
      },
        captchaText(){
          if(this.waiting){
              return this.waiting + '秒';
          }else{
              return '获取验证码';
          }
      }
  },
  methods:{
      getCaptcha(){
        if(this.waiting){
            return;
        }
        this.$http.post('public/api/customer/sendSmsCode.html',{
            "token":this.$global.userInfo.token,
            "phone" : this.mobile
        }).then(() => {
            this.setWaiting();
        }).catch(error =>{
            this.$toast('发送失败');
        });
      },
      setWaiting(){
          this.waiting = 60;
          const timer = setInterval(()=>{
              if(this.waiting === 0){
                  clearInterval(timer);
                  return;
              }
              this.waiting --;
          },1000);
      },
      submit(){
            if(!this.validMobile){
                return;
            }
            let params = {
                "token":this.$global.userInfo.token,
                "phone" : this.mobile,
                "captcha" : this.captcha
            }
            if(this.$route.query && this.$route.query.mid){
                params.mid = this.$route.query.mid;
            }
          this.$http.post('public/api/customer/bind.html',params).then((response)=>{
                this.$global.userInfo.mobile = this.mobile;
                var newToken = response.data.data.token;
                if(newToken && typeof newToken === 'string' && this.$global.userInfo.token !== newToken){
                    this.$global.userInfo.token = newToken;
                    localStorage.setItem('userInfo',JSON.stringify(this.$global.userInfo));
                }
                if(this.$global.selected.length){
                    this.$router.replace({name:'order'});
                }else{
                    this.$router.replace({name:'home'});
                }
            }).catch((error)=>{
                this.$toast(error.data.msg);
            });
      }
  },
  data() {
    return {
        mobile: '',
        captcha: '',
        waiting: 0,
        error: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .exchange-confirm{
    background-color: #f2f2f2;;

    .form-group{
        background-color: #FFF;
        margin-top: 10px;
    }
    .cell{
        text-align: left;
        border-bottom: 1px solid #e4e4e4;
        height: 44px;
        line-height: 44px;
    }

    .cell:last-child{
        border-bottom: none;
    }
    .cell-title{
        text-align: right;
        width: 64px;
        font-size: 16px;
        color: #666666;
        margin-left: 20px;
        margin-right: 10px;
    }

    .mobile{
        font-size: 16px;
	    color: #333333;
    }

    input.captcha{
        font-size: 16px;
    }
    ::-webkit-input-placeholder { 
        color: #e4e4e4;
    }

    .button{
        text-align: center;
        width: 90px;
        background-color: #d9d9d9;
        color: #ffffff;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        font-size: 14px;
	    color: #333333;

        &.active{
            background-color: #f3c81f;
        }

        &.captcha{
            width: 115px;
            font-size: 16px;
            margin-right: 10px;
            margin-top: 7px;
        }
        &.submit{
            margin-top: 48px;
            font-size: 18px;
	        color: #ffffff;
            width: 268px;
            height: 44px;
            line-height: 44px;
            background-color: #d9d9d9;
            border-radius: 100px;
        }

        
    }
 
  }


</style>
