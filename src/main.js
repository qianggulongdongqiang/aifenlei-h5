import Vue from 'vue'
import App from './App.vue'
import global from './global.vue'
import router from './router'
import util from './util'
import './assets/css/style.scss';
import 'normalize.css';
import axios from 'axios';
import { Swipe, SwipeItem,Toast,List,Popup,Picker} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Toast).use(List).use(Popup).use(Picker);
Vue.prototype.$http = axios;
Vue.prototype.$global = global;

Vue.config.productionTip = false;

axios.interceptors.response.use(
  response => {
    if(response.data.code === 1){
      return response;
    } else if(response.data.code === 2){
      localStorage.removeItem('userInfo');
      window.location.pathname = 'public/api/customer/get_user_info.html'
    }else{
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '爱分类爱回收'
  if(to.meta.auth && !Vue.prototype.$global.userInfo){
    let userInfoStr = window.localStorage.getItem('userInfo');
    if(userInfoStr) {
      Vue.prototype.$global.userInfo = JSON.parse(userInfoStr);
      next();
    }else{
      let token = util.getParameterByName('token');
      if(token){
        Vue.prototype.$global.userInfo = {token: token};
        localStorage.setItem('userInfo',JSON.stringify(Vue.prototype.$global.userInfo));
        let redirect = localStorage.getItem('redirect');
        if(redirect){
          router.replace(redirect,function(){
            localStorage.removeItem('redirect');
          });
        }else{
          next();
        }
      }else{
        if(to.name && to.name !=='home'){
          localStorage.setItem('redirect',to.fullPath);
        }
        window.location.pathname = 'public/api/customer/get_user_info.html'
      }
    }
    

  }else{
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
