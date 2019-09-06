<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Editar Colaborador</h3>
    <form action="" @submit.prevent="updateEmployee">
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Nome" v-model="employee.name" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Cpf" v-model="employee.cpf" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="PIS" v-model="employee.pis" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Cargo" v-model="employee.position" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Time" v-model="employee.team" />
      </div>
      <input type="submit" value="Editar Colaborador" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-dark block w-full py-4 text-white items-center justify-center" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditEmployee',
  data () {
    return {
      employee: '',
      error: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      let id = this.$route.params.id
      this.$http.secured.get(`/api/v1/employees/${id}`)
        .then(response => { this.employee = response.data })
        .catch(error => this.setError(error, 'Algo aconteceu de errado'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    updateEmployee () {
      this.$http.secured.patch(`/api/v1/employees/${this.employee.id}`, {
        employee: {
          name: this.employee.name,
          cpf: this.employee.cpf,
          pis: this.employee.pis,
          position: this.employee.position,
          team: this.employee.team
        }
      })
      .catch(error => this.setError(error, 'Não foi possível atualizar colaborador'))
      this.$router.push({ name: 'Employee'})
    }
  }
}
</script>
