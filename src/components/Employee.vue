<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Adicionar Colaborador</h3>
    <form action="" @submit.prevent="addEmployee">
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Nome" v-model="newEmployee.name" />
        <input class="input" autofocus autocomplete="off" placeholder="Cpf" v-model="newEmployee.cpf" />
        <input class="input" autofocus autocomplete="off" placeholder="PIS" v-model="newEmployee.pis" />
        <input class="input" autofocus autocomplete="off" placeholder="Cargo" v-model="newEmployee.position" />
        <input class="input" autofocus autocomplete="off" placeholder="Time" v-model="newEmployee.team" />
      </div>
      <input type="submit" value="Adicionar Colaborador" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-dark block w-full py-4 text-white items-center justify-center" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="employee in employees" :key="employee.id" :employee="employee">

        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            {{ employee.name }}
          </p>

          <button class="bg-tranparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="editEmployee(employee)">Editar</button>

          <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
            @click.prevent="removeEmployee(employee)">Deletar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Employees',
  data () {
    return {
      employees: [],
      newEmployee: [],
      error: '',
      editedEmployee: ''
    }
  },
  created () {
    this.$http.secured.get('/api/v1/employees')
      .then(response => { this.employees = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addEmployee () {
      const value = this.newEmployee
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/employees/', {
        employee: {
          name: this.newEmployee.name,
          cpf: this.newEmployee.cpf,
          pis: this.newEmployee.pis,
          position: this.newEmployee.position,
          team: this.newEmployee.team
        }
      })

        .then(response => {
          this.employees.push(response.data)
          this.newEmployee = ''
        })
        .catch(error => this.setError(error, 'Não foi possível criar colaborador'))
    },
    removeEmployee (employee) {
      this.$http.secured.delete(`/api/v1/employees/${employee.id}`)
        .then(response => {
          this.employees.splice(this.employees.indexOf(employee), 1)
        })
        .catch(error => this.setError(error, 'Não foi possível deletar colaborador'))
    },
    editEmployee (employee) {
      this.editedEmployee = employee
    },
    updateEmployee (employee) {
      this.editedEmployee = ''
      this.$http.secured.patch(`/api/v1/employees/${employee.id}`, { employee: { title: employee.name } })
        .catch(error => this.setError(error, 'Não foi possível atualizar colaborador'))
    }
  }
}
</script>
