<template>
  <div class="page home">
  <van-swipe :autoplay="3000" style="padding-bottom: 10px;margin-bottom: 10px;">
      <van-swipe-item v-for="slide in sliders">
            <a :href="slide.url">
                <img class="banner-item" :src="slide.image" :alt="slide.title">
            </a>
      </van-swipe-item>
  </van-swipe>

    <div class="catalog-section">
      <div class="catalog-wrapper">
        <template v-for="item in itemTypes">
          <a class="catlog-item" @click="goToPick(item)" :key="item.id">
              <img :src="item.img_1" :alt="item.name">
          </a>
        </template>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  created(){
      this.$http.post('public/api/customer/get_user_info_by_token.html',{
        "token":this.$global.userInfo.token
      })
      .then(response => {
        this.$global.userInfo.mobile = response.data.data.mobile;
      })
      .catch((error) => {
        console.log(error);
      });
    
    this.$http.post('public/api/common/getGoods.html')
    .then((response) => {
      this.itemTypes = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

    this.$http.post('public/api/common/getSlideList.html')
    .then(response => {
      this.sliders = response.data.data
    })
    .catch((error) => {
      console.log(error);
    });

  },
  data(){
    return{
      itemTypes: [],
      sliders: []
    }
  },
  methods:{
    goToPick(item){
      let linkName;
      this.$global.selected = [];
      this.$global.itemType = item;
          if(item.op_type === 1){
        linkName = 'multipick'
      }else if(item.op_type === 0){
        if(item.items.length > 1){
          linkName = 'pick'
        }else{
          linkName = 'order'
          this.$global.selected = item.items
        }
      }
      this.$router.push({ name: linkName, params: item});
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 10px;

  .van-swipe__indicators{
    bottom: 0px;
  }
}

.banner-item{
  width: 100%;
	height: 330px;
}

.catalog-section{
  border-top: 1px solid  #d8d8d8;
  padding-top: 35px;
}

.catalog-wrapper{
  display: flex;
}

.catlog-item{
  flex: 1;
  display: flex;
  height: 148px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: #333333;
  &:nth-child(1),&:nth-child(2){
    border-right: 1px solid #d8d8d8;
  }
  & img{
    width: 100px;

  }
}

</style>
