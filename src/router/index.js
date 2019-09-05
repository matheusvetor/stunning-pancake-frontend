import Vue from 'vue'
import Router from 'vue-router'
import Employee from '@/components/Employee'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/colaboradores',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/colaboradores/adicionar',
      name: 'addEmployee',
      component: NewEmployee
    },
    {
      path: '/colaboradores/editar/:id',
      name: 'editEmployee',
      component: EditEmployee
    }
  ]
})
