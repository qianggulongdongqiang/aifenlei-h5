<template>
    <div class="bind-page page">
        <div class="bind-form">
            <div style="margin-bottom: 20px;">
                <img class="title" src="../assets/image/logo.png" alt="LOGO">
                <input type="number" pattern="\d*" v-model="mobile" maxlength="11" placeholder="请输入手机号" class="mobile input" v-bind:class="{'has-error': mobileMsg}">
                <div class="error-msg" v-show="mobileMsg">{{mobileMsg}}</div>
            </div>
            <div style="display: flex;">
                <input type="number" pattern="\d*" v-model="captcha" placeholder="请输入验证码" class="captcha input" v-bind:class="{'has-error': captchaMsg}">
                <span class="button captcha" @click="getCaptcha()" v-bind:class="{'active': validMobile,'waiting': waiting}">{{captchaText}}</span>
            </div>
            <div class="error-msg" v-show="captchaMsg">{{captchaMsg}}</div>

            <div class="button submit" @click="submit()" v-bind:class="{'active': validForm}">立即投递</div>
            <div v-if="error">{{error}}</div>
        </div>
    </div>

</template>

<script>

export default {
  name: 'bindaccount',
  created(){
      this.$http.post('public/api/customer/get_user_info_by_token.html',{
        "token":this.$global.userInfo.token
      })
      .then(response => {
        if(response.data.data.mobile){
            this.$global.userInfo.mobile = response.data.data.mobile;
            this.$global.userInfo.more = response.data.data.more;
            this.$router.replace('myorder');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              return this.waiting + 's';
          }else{
              return '获取验证码';
          }
      }
  },

  methods:{
    getErrorMsg(error){
        this.mobileMsg = null;
        this.captchaMsg = null;
        if(error && error.data && error.data.msg){
            let msg = error.data.msg;
            if(msg.includes('手机')){
                this.mobileMsg = msg;
            }else{
                this.captchaMsg = msg;
            }
        }
    },
      getCaptcha(){
        if(!this.validMobile || this.waiting){
            return;
        }
        this.$http.post('public/api/customer/sendSmsCode.html',{
            "token":this.$global.userInfo.token,
            "phone" : this.mobile
        }).then(() => {
            this.setWaiting();
        }).catch(error =>{
            this.getErrorMsg(error);
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
                this.$toast('绑定成功');
                this.$global.userInfo.mobile = this.mobile;
                var newToken = response.data.data.token;
                if(newToken && typeof newToken === 'string' && this.$global.userInfo.token !== newToken){
                    this.$global.userInfo.token = newToken;
                    localStorage.setItem('userInfo',JSON.stringify(this.$global.userInfo));
                }
                if(this.$route.query && this.$route.query.mid){
                    this.$router.replace({name:'bindResult'});
                    return;
                }
                if(this.$route.params.from === 'points'){
                    this.$router.replace({name:'points'});
                    return;
                }
                if(this.$global.selected.length){
                    this.$router.replace({name:'order'});
                }else{
                    this.$router.replace({name:'home'});
                }
            }).catch((error)=>{
                this.getErrorMsg(error);
            });
      }
  },
  data() {
    return {
        mobile: '',
        captcha: '',
        waiting: 0,
        error: null,
        mobileMsg: null,
        captchaMsg: null,
    }
  }
}
</script>

<style lang="scss" scoped>
    .bind-page{
        background: url("../assets/image/bind_background.png"); 
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-color: #F4DD81;
    }

  .bind-form{
    background:rgba(255,255,255,1);
    height:425px;
    margin: 64px 15px 0 15px;
    padding: 36px 43px 0 43px;
    border-radius:19px;

        ::-webkit-input-placeholder { 
            font-weight:400;
            color:rgba(153,153,153,1);
            font-size: 13px;
        }

    .title{
        margin-bottom: 30px;
        width: 75px;
        color:rgba(33,36,40,1);
    }

    .input {
        width:260px;
        height:45px;
        line-height: normal;
        padding-left: 43px;
        font-size: 15px;
        font-weight:400;
        color:rgba(33,36,40,1);
        background-color:rgba(255,253,246,1);
        border-radius:23px;
        border:1px solid #FFB707;
        background-repeat: no-repeat;
        background-size: 25px;
        background-position: 14px 50%;

        &.mobile{
            width: 100%;
            background-image: url("../assets/image/phone_icon.png"); 
        }


        &.captcha{
            width: 150px;
            background-image: url("../assets/image/text_icon.png"); 
        }

    }

    .button{
        background:rgba(239,240,248,1);
        color:rgba(153,153,153,1);
        height: 55px;
        line-height: 55px;
        border-radius: 30px;
        border: 1px solid rgba(239,240,248,1);

        &.active{
            background:linear-gradient(153deg,rgba(255,235,56,1) 0%,rgba(255,230,52,1) 53%,rgba(255,225,48,1) 100%);
            color:rgba(33,36,40,1);
        }

        &.captcha{
            width:100px;
            height:45px;
            line-height: 45px;
            font-size:13px;
            font-weight:400;
            margin-left: 10px;

            &.waiting{
                color:rgba(33,36,40,1);
                font-size: 15px;
                background:rgba(239,240,248,1);
            }
        }
        &.submit{
            width: 100%;
            font-size: 16px;
            font-weight:500;
            margin-top: 50px;
        }
        
    }

        .error-msg{
            color: #EB0000;
            font-size:11px;
            font-weight:400;
            text-align: left;
            padding: 2px 44px 0;
            position: absolute;
        }

        .has-error{
            border-color: #EB0000;
            background-color: #fff;
        }
 
  }


</style>
