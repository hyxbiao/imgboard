import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DataSet from '@/components/DataSet'
import ImageCard from '@/components/ImageCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DataSet',
      component: DataSet
    },
    {
      path: '/test',
      name: 'ImageCard',
      component: ImageCard
    }
  ]
})
