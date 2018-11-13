<template>
  <div class="page pick">
    <h2 class="section-head">
      电器选择
    </h2>
    <div class="selection-wrapper">
        <div class="selection-item" v-bind:class="{ selected: isSelected(item) }" @click="singleSelect(item)" v-for="item in itemType.items" :key="item.id">
          <img class="selection-icon" :src="item.img_1"  :alt="item.name">
        </div>
    </div>
    <div class="pick-footer">
      <div class="pick-submit" @click="submit()">
        立即下单
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'pick',
  methods:{
    singleSelect(item){
      this.$set(this.selected,0,item);
    },
    isSelected(item){
      return item === this.selected[0];
    },
    submit(){
      if(this.selected.length){
          this.$router.push({ name: 'order', params: {selected: this.selected,itemType: this.itemType}});
      }
    }
  },
    data() {
    return {
      selected:this.$global.selected,
      itemType:this.$global.itemType
    }
  }
}
</script>

<style lang="scss">
.pick{
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.section-head 
{
  margin: 0;
	width: 375px;
  height: 44px;
  line-height: 44px;
	background-image: linear-gradient(90deg, 
		#fae541 0%, 
    #f3c81f 100%);
  color: #333333;
  font-size: 16px;
}

.selection-wrapper{
  flex: 0 auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}

.selection-icon{
  width: 100px;
}

.selection-item {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 50%;
  height: 140px;
  border-bottom: 1px solid #d7d7d7;

  &:nth-child(even){
    border-left: 1px solid #d7d7d7;
  }
}


.selection-item.selected{
 	background-color: #f3c81f;
}

.pick-submit {
	width: 375px;
	height: 54px;
  line-height: 54px;
  background-color: #3f3f3f;
  color: #ffffff;
}

.pick-tips {
	width: 375px;
	height: 30px;
  line-height: 30px;
	background-color: rgba(243, 200, 31, 0.3);
	border: solid 0px #f3c81f;
	font-size: 12px;
	color: #666666;
}

.icon-point{
    display:inline-block;
    width: 16px;
    height: 16px;
    background: url("../assets/image/point.png"); 
    background-size:cover;   
    vertical-align: middle;
    margin-top: -3px; 
}

</style>
