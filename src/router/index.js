import Vue from 'vue'
import Router from 'vue-router'
import Employee from '@/components/Employee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/colaboradores',
      name: 'Employee',
      component: Employee
    }
  ]
})
