<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Adicionar Horário</h3>
    <form action="" @submit.prevent="addTimeEntry">
      <div class="mb-6">
        <datetime type="datetime"
                  value-zone="America/Sao_Paulo"
                  v-model="newTimeEntry.entry">
        </datetime>
      </div>
      <input type="submit" value="Adicionar Horário" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="timeEntry in timeEntries" :key="timeEntry.id" :timeEntry="timeEntry">

        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            {{ timeEntry.entry }}
          </p>
          <button class="bg-tranparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="editTimeEntry(timeEntry)">Editar</button>

          <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
         @click.prevent="removeTimeEntry(timeEntry)">Deletar</button>
        </div>

        <div v-if="timeEntry == editedTimeEntry">
          <form action="" @submit.prevent="updateTimeEntry(timeEntry)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <datetime type="datetime"
                  value-zone="America/Sao_Paulo"
                  v-model="timeEntry.entry">
              </datetime>
              <input type="submit" value="Atualizar" class=" my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TimeEntries',
  data () {
    return {
      timeEntries: [],
      newTimeEntry: [],
      error: '',
      editedTimeEntry: '',
      employeeId: this.$route.params.id
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get(`/api/v1/employees/${this.employeeId}/time_entries`)
        .then(response => { this.timeEntries = response.data })
        .catch(error => this.setError(error, 'Algo aconteceu de errado'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addTimeEntry () {
      const value = this.newTimeEntry
      if (!value) {
        return
      }
      this.$http.secured.post(`/api/v1/employees/${this.employeeId}/time_entries`, { time_entry: { entry: this.newTimeEntry.entry } })

        .then(response => {
          this.timeEntries.push(response.data)
          this.newTimeEntry = ''
        })
        .catch(error => this.setError(error, 'Não foi possível criar horário'))
    },
    removeTimeEntry (timeEntry) {
      this.$http.secured.delete(`/api/v1/employees/${this.employeeId}/time_entries/${timeEntry.id}`)
        .then(response => {
          this.timeEntries.splice(this.timeEntries.indexOf(timeEntry), 1)
        })
        .catch(error => this.setError(error, 'Não foi possível deletar horário'))
    },
    editTimeEntry (timeEntry) {
      this.editedTimeEntry = timeEntry
    },
    updateTimeEntry (timeEntry) {
      this.editedTimeEntry = ''
      this.$http.secured.patch(`/api/v1/employees/${this.employeeId}/time_entries/${timeEntry.id}`, { time_entry: { entry: this.timeEntry.entry } })
        .catch(error => this.setError(error, 'Não foi possível atualizar horário'))
    }
  }
}
</script>
