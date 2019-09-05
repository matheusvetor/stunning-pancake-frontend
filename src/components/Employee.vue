<template>
  <div class="max-w-lg m-auto py-10 mt-0 border-t border-b border-gray-300 overflow-hidden relative">
    <router-link :to="{ name: 'addEmployee' }">Adicionar</router-link>
    <table class="w-full text-left table-collapse">
      <thead>
        <tr class="text-sm font-semibold text-gray-700 p-2 bg-gray-100">
          <th>Nome</th>
          <th>CPF</th>
          <th>PIS</th>
          <th>Cargo</th>
          <th>Time</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id" :employee="employee">
          <td>{{ employee.name }}</td>
          <td>{{ employee.cpf }}</td>
          <td>{{ employee.pis }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.team }}</td>
          <td>
            <router-link :to="{ name: 'timeEntries', params: { id: employee.id } }">Adicionar Horários</router-link>
            <router-link :to="{ name: 'editEmployee', params: { id: employee.id } }">Editar</router-link>
            <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
            @click.prevent="removeEmployee(employee)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Employees',
  data () {
    return {
      employees: [],
      error: '',
    }
  },
  created () {
    this.$http.secured.get('/api/v1/employees')
      .then(response => { this.employees = response.data })
      .catch(error => this.setError(error, 'Algo aconteceu de errado'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    removeEmployee (employee) {
      this.$http.secured.delete(`/api/v1/employees/${employee.id}`)
        .then(response => {
          this.employees.splice(this.employees.indexOf(employee), 1)
        })
        .catch(error => this.setError(error, 'Não foi possível deletar colaborador'))
    },
  }
}
</script>
