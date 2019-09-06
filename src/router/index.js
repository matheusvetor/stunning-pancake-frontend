import Vue from 'vue'
import Router from 'vue-router'
import Employee from '@/components/Employee'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import TimeEntries from '@/components/TimeEntries'
import Signin from '@/components/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
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
      path: '/colaboradores/:id/editar',
      name: 'editEmployee',
      component: EditEmployee
    },
    {
      path: '/colaboradores/:id/horarios',
      name: 'timeEntries',
      component: TimeEntries
    },
    {
      path: '/horarios',
      name: 'timeEntries',
      component: TimeEntries
    }
  ]
})
