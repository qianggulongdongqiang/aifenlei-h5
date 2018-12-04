<template>
    <div class="page-points">
        <div class="account-wrapper">
            <div class="hairline">
                <span class="label">账号手机：</span>
                <span class="value">{{mobile}}</span> 
            </div>
        </div>
        <div class="point-wrapper">
            <div>现有积分</div>
            <div class="big-point">{{points}}</div>
            <div class="money">={{points/100}}元</div>
            <div class="point-tip">
                积分大于2000方可提现
            </div>

            <div class="button goto-exchange" @click="gotoExchange()" :class="{'disabled': points < 2000}">积分提现</div>
        </div>
        <div class="exchange-explain">
            <div style="margin-bottom: 10px;">
                提现说明
            </div>
            <div>
                平台运营和资金管理原因，<br>
                积分大于2000（含）方可提现，还望谅解！
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            mobile: '',
            points: 0
        }
    },
    created(){
      this.$http.post('public/api/customer/get_user_info_by_token.html',{
        "token":this.$global.userInfo.token
      })
      .then(response => {
        if(response.data.data){
            if(response.data.data.subscribe !== 1){
                window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1NjU3NDUwNQ==&scene=124#wechat_redirect";
                return;
            }
            if(!response.data.data.mobile){
                this.$router.replace({name: 'bindaccount',params:{from:'points'}});
                return;
            }
            this.mobile = this.fuzzyMobile(response.data.data.mobile);
            this.points = response.data.data.score;

        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    methods:{
        fuzzyMobile(str){
            return str.replace(/(\w{3})\w*(\w{4})/, '$1***$2');
        },
        gotoExchange(){
            if(this.points >= 2000){
                this.$router.push({name:'exchange',params:{mobile: this.mobile,points: this.points}})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-points{
        margin: auto;
        text-align: center;
    }

    .money{
        font-size:14px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:20px;
        margin-bottom: 3.6vh;
    }

    .account-wrapper{
        margin: 50px 20px 0;
        padding-bottom: 15px;
        border-bottom: 1px solid #d8d8d8; 
        font-size: 16px;
    }
    .label{
        color: #666666;
    }

    .value {
        color: #333333;
    }

    .point-wrapper{
        margin-top: 50px;
        font-size: 16px;
    }

    .big-point{
        font-size: 40px;
        height:56px;
        line-height:56px;
        color: #333333;
    }

    .point-tip {
	    font-size: 14px;
	    color: #f4c81f;
    }

    .goto-exchange{
        margin-top: 2.25vh;
        width: 300px;
        height: 52px;
        line-height: 52px;
        background-color: #f3c81f;
        border-radius: 26px;
        font-size: 18px;
        color: #333333;
    }

    .exchange-explain{
        margin-top: 115px;
        font-size: 12px;
        color: #aaaaaa;
    }
</style>
