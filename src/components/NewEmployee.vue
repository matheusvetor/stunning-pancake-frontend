<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Adicionar Colaborador</h3>
    <form action="" @submit.prevent="addEmployee">
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Email" v-model="newEmployee.email" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Senha" v-model="newEmployee.password" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Nome" v-model="newEmployee.name" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Cpf" v-model="newEmployee.cpf" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="PIS" v-model="newEmployee.pis" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Cargo" v-model="newEmployee.position" />
      </div>
      <div class="mb-6">
        <input class="input" autofocus autocomplete="off" placeholder="Time" v-model="newEmployee.team" />
      </div>
      <input type="submit" value="Adicionar Colaborador" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-dark block w-full py-4 text-white items-center justify-center" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewEmployee',
  data () {
    return {
      newEmployee: [],
      error: '',
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    }
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
          email: this.newEmployee.email,
          password: this.newEmployee.password,
          name: this.newEmployee.name,
          cpf: this.newEmployee.cpf,
          pis: this.newEmployee.pis,
          position: this.newEmployee.position,
          team: this.newEmployee.team
        }
      })
      .catch(error => this.setError(error, 'Não foi possível criar colaborador'))
      this.$router.push({ name: 'Employee'})
    }
  }
}
</script>
