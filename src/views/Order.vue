<template>
  <div class="page order">
    <DatePicker ref="datePicker" @confirm="onDatePickerConfirm"></DatePicker>
    <CmPicker v-if="this.area.length" :area = area ref="cmPicker" @confirm="onCmPickerConfirm"></CmPicker>
    <div class="order-head">
      <div class="order-head-text">预约下单</div>
    </div>
    <div class="order-section top">
      <div class="order-field">
        <span class="order-label">回收种类</span>
        <div class="order-value">{{picked.itemType.name}}</div>
      </div>
      <div v-if="picked.selected" class="order-field">
        <span class="order-label">回收资源</span>
        <div class="order-value">{{selectedText()}}</div>
      </div>
      <div class="order-field" @click="openDatePicker()">
        <span class="order-label">预约时间</span>
        <div class="order-value">
          <div class="time-text">{{date}}</div>
          <i class="icon-forward"></i>
        </div>
      </div>
    </div>
    <div class="order-section second">
      <div class="order-field">
        <span class="order-label">联系人</span>
        <div class="order-value">
          <input type="text" placeholder="请填写预约人的姓名" v-model="userName" class="order-field__control">
          <div class="error" v-bind:class="{'show-error':hasError('userName')}">
            <div><i class="icon-waring"></i></div>
            <div class="error-text">请填写正确的联系人</div>
          </div>
        </div>
      </div>
      <div class="order-field user-info">
        <span class="order-label">手机号</span>
        <div class="order-value">
          <input type="tel" placeholder="请填写预约手机号码" v-model="mobile" maxlength="11" class="order-field__control">
          <div class="error" v-bind:class="{'show-error': hasError('mobile')}">
            <div><i class="icon-waring"></i></div>
            <div class="error-text">请填写正确的手机号码</div>
          </div>
        </div>
      </div>
      <div class="order-field user-info">
        <span class="order-label">地址</span>
        <div class="order-value" @click="openCmPicker">
          <input id="communityPicker" v-model="community" readonly type="text" placeholder="请选择预约地址" class="order-field__control">
          <i class="icon-forward"></i>
          <div class="error" v-bind:class="{'show-error':hasError('community')}">
            <div><i class="icon-waring"></i></div>
            <div class="error-text">请选择预约地址</div>
          </div>
        </div>
      </div>
        <div class="order-field user-info">
        <div class="order-value">
          <input type="text" placeholder="请填写详细单元号住户号" v-model="addressDetail" class="order-field__control">
          <div class="error" v-bind:class="{'show-error': hasError('addressDetail')}">
            <div><i class="icon-waring"></i></div>
            <div class="error-text">请填写详细单元号住户号</div>
          </div>
        </div>
      </div>
       <div class="order-field user-info" @click="addition = !addition">
        <span class="order-label long">我有有害垃圾，需要顺带回收</span>
        <div class="">
          <i class="order-addition" v-bind:class="{active: addition}"></i>
        </div>
        </div>
        <div class="order-submit" @click="submitOrder()">
          提交订单
        </div>
      </div>
    </div>
</template>

<script>
import DatePicker from '../components/DatePicker.vue'
import CmPicker from '../components/CmPicker.vue'
export default {
  name: 'order',
  components: {
    DatePicker,
    CmPicker
  },
  beforeRouteEnter (to, from, next) {
    next((vm)=>{
      if(!vm.$global.userInfo || !vm.$global.userInfo.mobile){
        next({replace: true,name: 'bindaccount'});
      }
    });
  },
  mounted(){
    var self =this;
    var now = new Date();
    var today = now.toISOString().split('T')[0];
    var todayArr= today.split('-');
    this.date = todayArr[0] + '年' + todayArr[1] + '月' + todayArr[2] + '日' + '(09:30-18:00)';
    this.$http.post('public/api/customer/get_user_info_by_token.html',{
      "token":this.$global.userInfo.token
    })
    .then(response => {
      if(response.data && response.data.data){
          this.$global.userInfo.more = response.data.data.more;
          if(this.$global.userInfo.more){
          this.mobile = this.$global.userInfo.more.mobile || '';
          this.userName = this.$global.userInfo.more.name || '';
          if(this.$global.userInfo.more.addr){
            var addrArr = this.$global.userInfo.more.addr.split(' ');
            this.addressDetail = addrArr[2];
            this.community = [addrArr[0], addrArr[1]].join(' ');
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });

    this.$http.post('public/api/common/getArea.html').then(function(result){
      console.log(result);
      self.area = result.data.data;
    }).catch(function(error){
      console.log(error);
    });
  },
  methods:{
    getAreaId(){
      let names = this.community.split(' ');
      let array = this.area[0].items;
      let id;
      console.log(JSON.stringify(array));
      for (let index = 0; index < array.length; index++) {
        if (names[0] === array[index].name){
          let items = array[index].items
          for (let index = 0; index < items.length; index++) {
            if(names[1] === items[index].name){
              id = items[index].id;
              break;
            };
          }
          break;
        }
      }
      return id;
    },
    openDatePicker(){
      this.$refs['datePicker'].open();
    },
    onDatePickerConfirm(values){
      this.date = values[0]+'年'+values[1]+'月'+values[2] +'日 ' + values[3];
      this.dateValues = values;
    },
    openCmPicker(){
      this.$refs['cmPicker'].open();
    },
    onCmPickerConfirm(data){
      this.area_id = data[1].id;
      this.community = data.map((i)=>i.name).join(' ');
    },
    hasError(prop){
      return this.errors[prop];
    },
    selectedText(separator){
      if(!this.picked.selected){
        return '';
      }
      return this.picked.selected.map(element => {
        return element.name;
      }).join(separator || ' ');
    },
    formateDate(){
      if(this.date){
        return new Date(this.date).toLocaleString();
      }
    },
    submitOrder(){
      if((this.dateValues[0] == '2018' && this.dateValues[1] == '09' && this.dateValues[2] == '24') || (this.dateValues[0] == '2018' && this.dateValues[1] == '10' && (this.dateValues[2] == '01' || this.dateValues[2] == '02' || this.dateValues[2] == '03'))){
        this.$toast('抱歉,当天不提供服务');
        return;
      }
      if(!this.userName){
        this.$set(this.errors,'userName',true);
        return;
      }else{
        this.$set(this.errors,'userName',false);
      }
      if(!this.mobile || this.mobile.length !== 11){
        this.$set(this.errors,'mobile',true);
        return;
      }else{
        this.$set(this.errors,'mobile',false);
      }
      if(!this.community){
        this.$set(this.errors,'community',true);
        return;
      }else{
        this.$set(this.errors,'community',false);
      }
      if(!this.addressDetail){
        this.$set(this.errors,'addressDetail',true);
        return;
      }else{
        this.$set(this.errors,'addressDetail',false);
      }
      if(!this.area_id){
        this.area_id = this.getAreaId();
      }
      let pickedText
      let selectedText = this.selectedText('、');
      if (selectedText){
        pickedText = this.picked.itemType.name +'、' + this.selectedText('、');
      }else{
        pickedText = this.picked.itemType.name;
      }
      
        this.$http.post('public/api/customer/addPreOrder.html',{
          time: this.dateValues.length ? this.dateValues[0]+'年'+this.dateValues[1]+'月'+this.dateValues[2] +'日 ' + this.dateValues[3] : this.date,
          name: this.userName,
          phone: this.mobile,
          addr: this.community + ' '+ this.addressDetail,
          area_id: this.area_id,
          goods: this.picked.selected,
          addition: this.addition ? 1 : 0,
          token: this.$global.userInfo.token
          }
      ).then(()=>{
          this.$router.replace({name:'response'});
          this.$global.selected = [];
          this.$global.itemType =null;
      }).catch(error=>{
        this.$toast('提交失败');
      });
    }
  },
  data() {
    return {
      errors:{},
      addition: false,
      mobile: '',
      community:'',
      area: [],
      area_id: null,
      addressDetail:'',
      userName:'',
      date: null,
      dateValues: [],
      picked: {
        selected: this.$global.selected,
        itemType: this.$global.itemType
      }
    }
  }
}
</script>

<style lang="scss">

.order-head {
	height: 150px;
	background-image: linear-gradient(90deg, 
		#fae541 0%, 
    #f3c81f 100%);
}

.order-head-text{
	font-size: 16px;
  color: #333333;
  padding: 10px;
}
.order-section {
	background-color: #ffffff;
	box-shadow: 0px 0px 4px 0px 
		rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin: 10px 10px;
}

.order-section.top{
  margin-top:-106px; 
}
.order-section.second{
  padding-bottom: 1px;
}

.order-field{
  display: flex;
  padding: 16px 15px;
  border-bottom: 1px solid #f2f2f2;
  text-align: left;
  position: relative;
  align-items:center;
}

.order-field .user-info{
  	font-size: 14px;
}

.order-label{
  flex: 1;
	font-size: 15px;
  color: #666666;
  max-width: 90px;
  align-self: center;
  
}

.order-label.long{
 max-width: unset;
}

.order-value{
  flex: 1;
  text-align: right;
  align-self: center;
}

.order-field__control{
  border: 0;
  padding: 0;
  display: block;
  width: 100%;
  resize: none;
  box-sizing: border-box;
}

.order-submit{
  margin: 15px 10px;
  height: 44px;
  line-height: 44px;
  background-color: #f3c81f;
	font-size: 16px;
	color: #3e3e3e;
}

.page.order{
  	background-color: #f2f2f2;
}

  .order-addition{  
    display:inline-block;
    width: 22px;
    height: 22px;
    background:url('../assets/image/select_g.png');
    background-size:cover; 
  }
  .order-addition.active{  
    background:url('../assets/image/select_y.png');
    background-size:cover; 
  }

  .icon-forward{
    display:inline-block;
    width: 20px;
    height: 20px;
    background: url("../assets/image/forward.png"); 
    background-size:cover;   
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
}

.icon-waring{
    display:inline-block;
    width: 16px;
    height: 16px;
    background: url("../assets/image/point_r.png"); 
    background-size:cover;   
    vertical-align: middle;
}
.error-text{
    display:inline-block;
    width: 162px;
    height: 26px;
    line-height: 32px;
    text-align: center;
    background: url("../assets/image/error2.png"); 
    background-size:cover;   
    vertical-align: middle;
    font-size: 15px;
    color: #666666;
    margin: -5px -8px 0 0;
}

.show-error{
  display: block;
}

.error{
    display: none;
    position: absolute;
    top: 18px;
    right: 15px;
}

.error.show-error{
  display: block;
}

.time-text{
  font-size: 14px;
	color: #4a90e2;
  margin-right: 10px;
}
</style>
