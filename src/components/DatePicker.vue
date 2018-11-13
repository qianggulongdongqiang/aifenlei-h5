<template>
      <van-popup v-model="show" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="cancle"
          @change="onChange"
        />
      </van-popup>
</template>
<script>
const today = new Date();
export default {
  name: 'DatePicker',
  props: ['initDate'],
  data(){
    return{
      currentValues: [],
      years: this.range(today.getFullYear(),2),
      months: this.range(1,12,today.getMonth()+1),
      days:[],
      extend:['上午(09:30-12:00)', '下午(13:00-18:00)'],
      columns:[],
      show: false
    }
  },
  created(){
    this.currentValues = [today.getFullYear(),today.getMonth()+1,today.getDate(),today.getHours() >=  11 ? this.extend[1] : this.extend[10]];
    this.days = this.getDays(today.getFullYear(),today.getMonth()+1);
    this.columns = [
        {values: this.years,defaultIndex: 0},
        {values: ['年']},
        {values: this.months,defaultIndex: today.getMonth()},
        {values: ['月']},
        {values: this.days,defaultIndex: today.getDate()-1},
        {values: ['日']},
        {values: this.extend,defaultIndex: today.getHours() >=  11 ? 1 : 0}
    ]
  },
  methods:{
    open(){
      this.show = true;
    },
    close(){
      this.show = false;
    },
    setTodayExtend(){
      return [];
    },
    getDays(year,month){
      var minDay = (year == today.getFullYear() && month == today.getMonth()+1) ? today.getDate() : null;
      var days =[];
      //如果是2月
      if(month == 2){
          //如果是闰年
          if((year % 4 === 0 && year % 100 !== 0)  || year % 400 === 0){
              days = this.range(1,29,minDay);
          //如果是平年
          }else{
              days = this.range(1,28,minDay);
          }
      //如果是第4、6、9、11月
      }else if(month == 4 || month == 6 ||month == 9 ||month == 11){
          days = this.range(1,30,minDay);
      }else{
          days = this.range(1,31,minDay);
      }
      return days;
    },
    range(start,length,min){
      let arr = [];
      let item = start;
      for(let i = 0; i < length; i++){
        let text = item.toString().padStart(2, "0");
        if(min){
          arr.push( { text: text, disabled: item < min });
        }else{
          arr.push(text);
        }
        item ++ ;
      }
      return arr;
    },
    getText(a){
      if(typeof a === 'string'){
        return a;
      }else{
        return a.text;
      }
    },
    onChange(picker, values) {
      if(this.currentValues[0] !== values[0] || this.currentValues[1] !== values[2]){
        if(today.getFullYear() != values[0]){
          let month = this.range(1,12);
          picker.setColumnValues(2, month);
        }else{
          let month = this.range(1,12,today.getMonth()+1);
          picker.setColumnValues(2, month);
        }
        let indexes = picker.getIndexes();
        let days = this.getDays(values[0],indexes[2] +1);
        picker.setColumnValues(4, days);
        if(days[indexes[4]]){
          this.$nextTick(()=>{
            picker.setColumnIndex(4,indexes[4])
          });
        }
      }
      let currentValues = picker.getValues();
      this.currentValues = [currentValues[0],this.getText(currentValues[2]),this.getText(currentValues[4]),currentValues[6]];
      this.$emit('change',this.currentValues);
    },
    onConfirm(){
      this.close();
      this.$emit('confirm',this.currentValues);
    },
    cancle(){
      this.close();
      this.$emit('cancel');
    }
  }
}
</script>
<style>

</style>

