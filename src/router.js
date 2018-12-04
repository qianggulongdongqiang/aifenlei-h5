import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Pick from './views/Pick.vue'
import MultiPick from './views/MultiPick.vue'
import Order from './views/Order.vue'
import MyOrder from './views/MyOrder.vue'
import Response from './views/Response.vue'
import BindAccount from './views/BindAccount.vue'
import BindResult from './views/BindResult.vue'
import Points from './views/Points.vue'
import Exchange from './views/Exchange.vue'
import ExchangeResult from './views/ExchangeResult.vue'
import Price from './views/Price.vue'
import Test from './views/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '预约下单',
        auth: true
      }
    },
    {
      path: '/pick',
      name: 'pick',
      component: Pick,
      meta: {
        title: '爱分类爱回收',
        keepAlive: false
      }
    },
    {
      path: '/multipick',
      name: 'multipick',
      component: MultiPick,
      meta: {
        title: '爱分类爱回收',
        keepAlive: false
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '爱分类爱回收',
        auth: true
      }
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: MyOrder,
      meta: {
        title: '爱分类爱回收',
        auth: true
      }
    },
    {
      path: '/response',
      name: 'response',
      component: Response,
      meta: {
        title: '爱分类爱回收',
        auth: true
      }
    },
    {
      path: '/bindaccount',
      name: 'bindaccount',
      component: BindAccount,
      meta: {
        title: '绑定账户',
        auth: true
      }
    },
    {
      path: '/bindResult',
      name: 'bindResult',
      component: BindResult,
      meta: {
        title: '登录成功',
        auth: false
      }
    },
    {
      path: '/points',
      name: 'points',
      component: Points,
      meta: {
        title: '爱分类爱回收',
        auth: true
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: Exchange,
      meta: {
        title: '爱分类爱回收',
        auth: true
      }
    },
    {
      path: '/exchangeResult',
      name: 'exchangeResult',
      component: ExchangeResult,
      meta: {
        title: '爱分类爱回收',
        // auth: true
      }
    },
    {
      path: '/price',
      name: 'price',
      component: Price,
      meta: {
        auth: false
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: '测试'
      }
    }
  ]
})
