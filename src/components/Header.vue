<template>
  <header class="bg-grey-lighter py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="flex-1 flex items-center">
        <a href="/" class="uppercase text-sm font-mono pl-4 font-semibold no-underline text-indigo-dark hover:text-indigo-darker">Code Challenge</a>
      </div>
      <div>
        <router-link to="/colaboradores" class="link-grey px-2 no-underline" v-if="signedIn() && isAdmin()">Colaboradores</router-link>
        <a href="#" @click.prevent="signOut" class="link-grey px-2 no-underline" v-if="signedIn()">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    isAdmin () {
      return localStorage.isAdmin === 'true'
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Não foi possível desconectar'))
    }
  }
}
</script>
