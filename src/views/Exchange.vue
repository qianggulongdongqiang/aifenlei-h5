<template>
    <div class="page exchange">
        <h2 class="head">积分提现</h2>
        <div class="name-wrapper">
            <span class="label">姓名</span>
            <input class="name-text" autofocus v-model="name" placeholder="请输入微信钱包的认证姓名">
        </div>
        <div class="exchange-wrapper">
            <div class="point-wrapper clearfix">
                <div class="clearfix">
                    <span class="label left">消耗积分：</span>
                    <span class="right exchange-all" @click="allIn">全部提现</span>
                </div>
                <div>
                    <div class="exchange-tip">
                        100积分=1元
                        <div class="right total-points">现有积分：{{points}}</div>
                    </div>
                    <input class="exchange-controller" v-model="pointsExchange" type="number">
                </div>
            </div>
            <div class="clearfix">
                <span class="label left">提现金额：</span>
                <span class="money right">{{money}}元</span>
            </div>
            <div class="button submit" :class="{ disabled: !pointsExchange || !name}" @click="exchangeConfirm">确认兑换</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pointsExchange: null,
            points: 0,
            name: '',
            mobile: ''
        }
    },
    computed:{
        money(){
            return (this.pointsExchange/100 || 0).toFixed(2);
        }
    },
    methods:{
        allIn(){
            this.pointsExchange = this.points;
        },
        exchangeConfirm(){
            if(this.name && this.pointsExchange && this.pointsExchange <= this.points){
                this.$http.post('public/api/wx/cash.html',{
                    token: this.$global.userInfo.token,
                    score: this.pointsExchange,
                    name: this.name
                }).then((response) => {
                    if(response && response.data && response.data.data){
                       let data = response.data.data;
                       let resultMsg = {
                           pointsUsed: data.score,
                           money: data.money,
                           time: data.time,
                           pointsRest: this.points - data.score,
                           mobile: this.mobile
                       };
                       this.$router.replace({name:'exchangeResult',params:resultMsg});
                    }
                }).catch(error =>{
                    let msg = '提现失败';
                    if(error && error.data && error.data.msg){
                        msg = error.data.msg;
                    }
                    this.$toast(msg);
                });
            }else{
                this.$toast('请输入姓名和有效积分');
            }
        }
    },
    created(){
        this.points = this.$route.params.points;
        this.mobile = this.$route.params.mobile;
        // if(!this.points){
        //     this.$router.replace({name:"points"});
        // }
    }
}
</script>

<style lang="scss" scoped>
.head{
    margin: 15px auto;
	font-size: 18px;
	color: #666666;
}

.page.exchange{
    background-color: #f2f2f2;
}

input{
    border: none;
}

.name-wrapper {
    display: flex;
    margin: 10px;
    padding:10px 20px;
    text-align: left;
	background-color: #ffffff;
}

.name-text{
    color: #4a4a4a;
    font-size: 16px;
    margin-left: 30px;
    flex-grow: 1;
}

    .exchange-wrapper{
        margin: 10px;
        padding: 20px;
        background-color: #FFF;
    }

    .point-wrapper{
        border-bottom: 1px solid #d8d8d8;
        margin-bottom: 20px;
    }

    .label{
        font-size: 16px;
        color: #666666;
    }

    .exchange-all {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border: 1px solid #f3c81f;
        font-size: 14px;
	    color: #333333;
    }

    .exchange-controller {
        height: 56px;
        font-size: 40px;
        color: #333333;
        padding: 0;
        width: 100%;
    }

    .money{
	    font-size: 20px;
	    color: #333333;
    }

    .exchange-tip {
        margin-top: 8px;
        text-align: left;
        font-size: 14px;
        letter-spacing: 0px;
        color: #f4c81f;
    }

    .submit{
        margin-top: 20px;
        width: 300px;
        height: 52px;
        line-height: 52px;
        background-color: #f3c81f;
        border-radius: 26px;
        font-size: 18px;
	    color: #333333;
    }

    .total-points{
        color: #999999;
        font-size: 14px;
    }

</style>
