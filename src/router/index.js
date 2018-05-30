import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import View from '@/components/browser/View'
import DataSet from '@/components/DataSet'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/view',
      name: 'View',
      component: View
    },
    {
      path: '/classification',
      name: 'DataSet',
      component: DataSet
    },
    {
      path: '/test',
      name: 'Test',
      component: Layout
    },
  ]
})
/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/classification',
          name: 'DataSet',
          component: DataSet
        },
        {
          path: '/test',
          name: 'ImageCard',
          component: ImageCard
        }
      ],
    },
  ]
})
*/
