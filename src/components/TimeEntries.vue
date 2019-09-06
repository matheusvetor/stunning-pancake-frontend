<template>
  <div class="container">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="">Adicionar Horário</h3>
    <form action="" @submit.prevent="addTimeEntry">
      <div class="form-group">
        <datetime type="datetime"
                  input-class="form-control"
                  value-zone="America/Sao_Paulo"
                  v-model="newTimeEntry.entry">
        </datetime>
      </div>

      <input type="submit" value="Adicionar Horário" class="btn btn-primary" />
    </form>

    <hr class="" />

    <div class="card mb-2" v-for="timeEntry in timeEntries" :key="timeEntry.id" :timeEntry="timeEntry">
      <div class="card-body">
        <h5 class="card-title">{{ customFormatter(timeEntry.entry) }}</h5>

        <button class="btn btn-sm btn-primary"
        @click.prevent="editTimeEntry(timeEntry)">Editar</button>

        <button class="btn btn-sm btn-danger"
        @click.prevent="removeTimeEntry(timeEntry)">Deletar</button>

        <div v-if="timeEntry == editedTimeEntry" class="mt-2">
          <form action="" @submit.prevent="updateTimeEntry(timeEntry)">
            <div class="form-group">
              <datetime type="datetime"
                  value-zone="America/Sao_Paulo"
                  input-class="form-control"
                  v-model="timeEntry.entry">
              </datetime>
            </div>
            <input type="submit" value="Atualizar" class="btn btn-primary">
          </form>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TimeEntries',
  data () {
    return {
      timeEntries: [],
      newTimeEntry: [],
      error: '',
      editedTimeEntry: '',
      employeeId: this.$route.params.id || localStorage.employeeId
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
    customFormatter(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    },
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
