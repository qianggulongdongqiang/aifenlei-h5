<template>
      <van-popup v-model="show" position="bottom">
        <van-picker class="cmpicker"
          show-toolbar
          :columns="columns"
          value-key = "name"
          @confirm="onConfirm"
          @cancel="cancle"
          @change="onChange"
        />
      </van-popup>
</template>
<script>
const today = new Date();
export default {
  name: 'CmPicker',
  props: ['area'],
  data(){
    return{
      lastValues:[],
      columns:[],
      show: false
    }
  },
  created(){
    this.items = this.area[0].items[0].items
    this.columns = [
        {values: this.area[0].items},
        {values: this.area[0].items[0].items},
    ]
  },
  methods:{
    open(){
      this.show = true;
    },
    close(){
      this.show = false;
    },
    onChange(picker, values) {
      if(this.lastValues[0] !== values[0]){
        picker.setColumnValues(1, this.area[0].items[picker.getColumnIndex(0)].items);
      }
      this.lastValues = values;
      this.$emit('change',values);
    },
    onConfirm(values){
      this.close();
      this.$emit('confirm',values);
    },
    cancle(){
      this.close();
      this.$emit('cancel');
    }
  }
}
</script>
<style>
 .cmpicker .van-picker-column__item {
    text-align: left;
}
</style>

