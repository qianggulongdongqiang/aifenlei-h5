<template>
<div>
    <button @click="test()">按钮</button>
    <DatePicker ref="datePicker" @change="onChange" @confirm="onConfirm"></DatePicker>
</div>

</template>

<script>
import DatePicker from '../components/DatePicker.vue'
export default {
  components: {
    DatePicker
  },
  methods:{
      test(){
        //   this.$router.replace("/test?pp=ooo");
          this.$router.replace({name:'bindResult'});
          return;
          this.$router.replace({name:'home'});
        //   WeixinJSBridge.call('closeWindow');
        //   this.$refs['datePicker'].open();
      },
      onChange(values){
          console.log("onChange",values);
      },
      onConfirm(values){
          console.log("onConfirm",values);
      }
  }
}
</script>

