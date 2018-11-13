<template>
    <div class="page myOrder">
        <h2 class="section-head">
        我的订单
        </h2>
        <div class="tab">
            <div class="tablinks" v-bind:class="{active: selectedTab === 'unfinished'}" @click="selectedTab = 'unfinished'">
                <div class="tablinks-title">
                    待服务
                </div> 
            </div>
            <div class="tablinks" v-bind:class="{active: selectedTab === 'finished'}" @click="selectedTab = 'finished'">
                <div class="tablinks-title">
                    已完成
                </div>
            </div>
        </div>
        <div class="tabcontent" v-if="selectedTab==='unfinished'">
            <van-list
                v-model="preOrderLoading"
                :finished="preOrderFinished"
                @load="preOrderOnLoad"
                :offset = 100
            >
                <OrderItem v-for="order in preOrders" :orderData="order" :key="order.order_id" @cancleOrder="cancleConfirm(order)" @orderAgain="orderAgain()"></OrderItem>
            </van-list>
            <div class="no-order" v-show="preOrdersPage && !preOrders.length">
                <div class="no-order-text">订单内空空如也</div>
                <div class="no-order-redirect" @click="orderAgain()">预约下单</div>
            </div>
        </div>
        <div class="tabcontent" v-if="selectedTab==='finished'">
            <van-list
                v-model="orderLoading"
                :finished="orderFinished"
                @load="orderOnLoad"
                :offset = 100
            >
            <OrderItem v-for="order in orders" :orderData="order" :key="order.order_id" :status="'finished'" @orderAgain="orderAgain()"></OrderItem>
            </van-list>
            <div class="no-order" v-show="ordersPage && !orders.length">
                <div class="no-order-text">订单内空空如也</div>
                <div class="no-order-redirect" @click="orderAgain()">预约下单</div>
            </div>
        </div>
        <CancleModal v-show="showModal" @cancle="hideModal()" @comfirmed="cancleOrder()"></CancleModal>
  </div>
</template>
<script>
import OrderItem from '../components/OrderItem.vue'
import CancleModal from '../components/CancleModal.vue'
export default {
    components:{
        OrderItem,
        CancleModal
    },
    data(){
        return{
            selectedTab: 'unfinished',
            showModal: false,
            selectedOrder: null,
            preOrders: [],
            orders: [],
            preOrderLoading: false,
            preOrderFinished: false,
            preOrdersTotal: 0,
            preOrdersPage: 0,
            orderLoading: false,
            orderFinished: false,
            ordersTotal: 0,
            ordersPage: 0
        }
    },
    methods:{
        preOrderOnLoad(){
            this.$http.post('public/api/customer/getPreOrders.html',{
                token: this.$global.userInfo.token,
                p: this.preOrdersPage
            }).then(result => {
                this.preOrders = this.preOrders.concat(result.data.data.items);
                this.preOrdersTotal = result.data.data.total;
                this.preOrderLoading = false;
                this.preOrdersPage++;
                if(this.preOrdersTotal === this.preOrders.length){
                    this.preOrderFinished = true;
                }
            });
        },
        orderOnLoad(){
            this.$http.post('public/api/customer/getOrders.html',{
                token: this.$global.userInfo.token,
                p: this.ordersPage
            }).then(result => {
                this.orders = this.orders.concat(result.data.data.items);
                this.ordersTotal = result.data.data.total;
                this.orderLoading = false;
                this.ordersPage++;
                if(this.ordersTotal === this.orders.length){
                    this.orderFinished = true;
                }
            });
        },
        reloadPreOrder(){
            this.preOrders = [];
            this.preOrderLoading= false;
            this.preOrderFinished= false;
            this.preOrdersTotal= 0;
            this.preOrdersPage= 0;
        },
        cancleConfirm(order){
            this.showModal =true;
            this.selectedOrder = order;
        },
        hideModal(){
            this.showModal = false;
        },
        cancleOrder(){
            this.hideModal();
            this.$http.post('public/api/customer/cancelPreOrder.html',
            {'token': this.$global.userInfo.token,'order_id': this.selectedOrder.order_id})
            .then(()=>{
                // this.$toast('取消成功');
                this.reloadPreOrder();
            });
        },
        orderAgain(){
            this.$router.replace({name:'home'});
        }
    }
};
</script>
<style lang="scss">

    .no-order{
        margin-top: 130px;
    }

    .no-order-text{
        height: 12px;
        font-size: 16px;
        line-height: 12px;
        color: #cccccc;
    }

    .no-order-redirect {
        margin: 30px auto;
        width: 215px;
        height: 44px;
        line-height: 44px;
        background-color: #ffffff;
        border-radius: 37px;
        border: solid 1px #f3c81f;
        font-size: 16px;
        color: #3e3e3e;
    }

    .myOrder{
        background-color: #f2f2f2;
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
</style>


