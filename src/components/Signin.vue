<template>
  <form class="form-signin" @submit.prevent="signin">
    <h1 class="h3 mb-3 font-weight-normal">Faça login</h1>
    <div class="text-red" v-if="error">{{ error }}</div>
    <label for="inputEmail" class="sr-only">Endereço de email</label>
    <input type="email" v-model="email" class="form-control" id="email" placeholder="email@email.com">
    <label for="inputPassword" class="sr-only">Senha</label>
    <input type="password" v-model="password" class="form-control" id="password" placeholder="Senha">
    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      localStorage.isAdmin = response.data.is_admin
      localStorage.employeeId = response.data.employee_id
      this.error = ''
      this.$router.replace('/colaboradores')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
      delete localStorage.isAdmin
      delete localStorage.employeeId
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/colaboradores')
      }
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
