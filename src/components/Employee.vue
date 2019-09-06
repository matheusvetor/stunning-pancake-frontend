<template>
  <div class="container">
    <router-link :to="{ name: 'addEmployee' }" class="btn btn-primary mb-3">Adicionar</router-link>
    <table class="table">
      <thead>
        <tr class="">
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
            <router-link :to="{ name: 'timeEntries', params: { id: employee.id } }" class="btn btn-success">Adicionar Horários</router-link>
            <router-link :to="{ name: 'editEmployee', params: { id: employee.id } }" class="btn btn-success">Editar</router-link>
            <button class="btn btn-danger"
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
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      if (localStorage.isAdmin !== 'true') {
        this.$router.replace('/horarios')
      }
      this.$http.secured.get('/api/v1/employees')
        .then(response => { this.employees = response.data })
        .catch(error => this.setError(error, 'Algo aconteceu de errado'))
    }
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
