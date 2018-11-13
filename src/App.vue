<template>
  <div id="app">
    <!-- <div id="nav">
      <span class="nav-button" @click="$router.go(-1)">
        <i class="nav-icon"></i>
        返回
      </span>
      <h1 class="nav-title">{{$route.meta.title}}</h1>
    </div> -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 20px 0 0;
	height: 64px;
  background-color: #333333;
  position: relative;
}

.nav-title{
  font-size: 16px;
  color: #dddddd;
}

.nav-button{
  position:absolute;
  display: inline-block;
  left: 4px;
  top: 30px;
	font-size: 16px;
  color: #dddddd;

}
.nav-icon{
  width: 25px;
  height: 25px;
  transform:scaleX(-1);
  display:inline-block;
  background: url("./assets/image/forward.png"); 
  background-size:cover;   
  vertical-align: middle; 
  margin-top: -5px;
}


</style>
