<template>
    <div class="order-item">
        <div class="order-item-head">
            <span class="order-code">
                订单号：{{orderData['order_sn']}}
            </span>
            <span class="order-status">
                {{status ==='finished' ? '回收已完成': '等待服务'}}
            </span>
        </div>
        <div class="order-item-content">
            <div class="order-detail-item">
                <label class="order-content-label">
                    预约时间：
                </label>
                <span class="order-content-value">{{orderData.finished_time}}</span>
            </div>
            <div class="order-detail-item">
                <label class="order-content-label">
                    回收类型：
                </label>
                <span class="order-content-value">{{orderData.goods[0].pname}}</span>
            </div>
            <div class="order-detail-item">
                <label class="order-content-label">
                    资源类型：
                </label>
                <span class="order-content-value">
                    {{orderData.goods.map((item)=>{return item.name}).join(' ')}}
                </span>
            </div>

        </div>
        <div class="order-item-footer">
            <span class="btn-order btn-cancle" @click="cancleOrder()" v-if="status!=='finished'">
                取消预约
            </span>
            <span class="btn-order btn-submit" @click="orderAgain()">
                再次预约
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name:'OrderItem',
    props:{
        orderData:{
            type: Object
        },
        status
    },
    methods:{
        cancleOrder(){
            this.$emit('cancleOrder');
        },
        orderAgain(){
            this.$emit('orderAgain');
        },
    }
}
</script>
<style lang="scss">

.order-item{
    background: #ffffff;
    margin-top: 10px;
}

.order-item-head{
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.order-code {
	font-size: 14px;
	color: #999999;
}

.order-status{
	font-size: 18px;
	color: #f4c81f;
}

.order-item-content{
    padding: 16px 0;
    margin: 0 20px;
    text-align: left;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
}

.order-content-label {
	font-size: 15px;
	color: #666666;
}

.order-content-value {
	font-size: 15px;
	color: #262626;
}

.order-item-footer{
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
}

.order-detail-item + .order-detail-item{
    margin-top: 14px;
}

.btn-order{
    display: inline-block;
	width: 80px;
	height: 29px;
    line-height: 29px;
	border-radius: 100px;
	font-size: 14px;
    color: #333333;
}

.btn-order.btn-cancle {
	background-color: #ffffff;
	border: solid 1px #f3c81f;
}

.btn-order.btn-submit {
	background-color: #f3c81f;
}

.btn-order:first-of-type{
    margin-right: 16px;
}
</style>


