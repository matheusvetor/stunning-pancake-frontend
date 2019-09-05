<template>
  <header class="bg-grey-lighter py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="flex-1 flex items-center">
        <a href="/" class="uppercase text-sm font-mono pl-4 font-semibold no-underline text-indigo-dark hover:text-indigo-darker">Code Challenge</a>
      </div>
      <div>
        <router-link to="/colaboradores">Colaboradores</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
