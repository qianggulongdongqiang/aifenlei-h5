<template>
    <div class="page price">
        <div class="price-head">
            <h2 class="section-head">
                今日资源回收价
            </h2>
            <div class="tab">
                <template v-for="good in goods">
                    <div class="tablinks" v-bind:key="good.id" v-bind:class="{active: selectedTab === good.name}" @click="selectedTab = good.name">
                        <div class="tablinks-title">
                            {{good.name}}
                        </div> 
                    </div>
                </template>
            </div>
        </div>

        <div class="price-wrapper">
            <template v-for="good in goods">
                <table class="tabcontent" v-if="selectedTab === good.name">
                    <tr>
                        <th>类型</th>
                        <th>单位</th>
                        <th>积分</th>
                    </tr>
                    <tr v-for="item in good.items">
                        <td>{{item.name}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.purchasing_point}}</td>
                    </tr>
                </table>
            </template>
        </div>
        
        <div class="price-footer">
            <div class="price-submit" @click="goHome()">
                立即下单
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created(){
        this.$http.post('public/api/common/getGoods.html')
        .then((response) => {
            this.goods = response.data.data;
            this.selectedTab = this.goods[0].name;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    data(){
        return{
            selectedTab: '',
            goods: []
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'home'});
        }
    }
};
</script>
<style lang="scss" scoped>
    .price{
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #f2f2f2;
    }

    .price-head{
        flex: 0 0 auto;
    }

    .price-wrapper{
        flex: 1 1 auto;
        overflow-y: auto;
        margin-top: 9px;
        display: flex;
        justify-content: center;
        background-color: #ffffff;
    }

    .price-footer{
        flex: 0 0 auto;
	    height: 54px;
        line-height: 54px;
	    background-color: #f4c81f;
        font-size: 17px;
        color: #333333;
    }
    .tab{
        display: flex;
        align-items: center;
	    background-color: #ffffff;
    }

    .tablinks{
        flex:1;
        display: flex;
        justify-content: center;
        width: 70px;
        height: 43px;
        font-size: 16px;
        line-height: 43px;
        color: #333333;
    }

    .tablinks.active{
        color: #f4c81f;
    }
    .tablinks .tablinks-title{
        border: 2px solid #ffffff;
        width: 70px;
    }

    .tablinks.active .tablinks-title{
        border-bottom-color: #f3c81f;
    }

    .tabcontent{
        width: 96%;
        background-color: #ffffff;
        border-spacing:0px 16px;

        th{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
            width: 33.3%;
            border-bottom: solid 1px #dddddd;
            padding-bottom: 15px;
        }

        td{
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
        }
    }
</style>


