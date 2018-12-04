<template>
  <div class="page pick">
    <h2 class="section-head">
      回收资源选择
    </h2>
      <div class="selection-wrapper">
        <div class="selection-item" v-bind:class="{ selected: isMultiSelected(item) }" @click="multiSelect(item)" v-for="item in itemType.items" :key="item.id">
          <img class="selection-icon" :src="item.img_1" :alt="item.name">
        </div>
      </div>
    <div class="pick-footer">
      <div class="pick-tips">
        <i class="icon-point"></i>
        <span>以上资源支持多选</span>
      </div>
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
    submit(){
      if(this.selected.length){
          this.$router.push({ name: 'order', params: {selected: this.selected,itemType: this.itemType}});
      }
    },
    multiSelect(item){
      var index = this.selected.indexOf(item);
      if(index > -1){
        this.selected.splice(index,1);
      }else{
        this.selected.push(item);
      }
    },
    isMultiSelected(item){
      return this.selected.indexOf(item) > -1;
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
