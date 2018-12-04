<template>
    <div class="modal">
        <div class="modal-container">
            <div class="modal-content">
                    <img class="modal-content-icon" src="../assets/image/wait.png" alt="等等">
                <div class="modal-content-text">
                    收件员正在快马加鞭赶过来
                    <br>
                    确定要取消么
                </div>
            </div>
            <div class="modal-footer">
                <span class="modal-comfirmed" @click="comfirmed()">
                    取消预约
                </span>
                <span class="modal-cancle" @click="cancle()">
                    再等一会
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        comfirmed(){
            this.$emit('comfirmed');
        },
        cancle(){
            this.$emit('cancle');
        }
    }
}
</script>
<style lang="scss">

.modal{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-container {
	width: 270px;
    padding: 20px;
	background-color: #ffffff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.modal-content{
    margin-top: 20px;
    margin-bottom: 34px;
    text-align: center;
}

.modal-content-icon{
    width: 48px;
    margin-bottom: 16px;
}

.modal-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-comfirmed{
	border-radius: 100px;
	border: solid 1px #666666;
	font-size: 14px;
    color: #666666;
    width: 80px;
    height: 29px;
    line-height: 29px;
}

.modal-cancle {
    display: inline-block;
	background-color: #f3c81f;
	border-radius: 100px;
	font-size: 14px;
    color: #333333;
    width: 80px;
    height: 29px;
    line-height: 29px;
}
</style>


