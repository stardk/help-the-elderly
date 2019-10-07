import api from '@/services/api'

export default {
  fetchTasks () {
    return api().get('tasks')
  },
  addTask (params) {
    return api().post('tasks', params)
  },
  deleteTask (id) {
    return api().delete('tasks/' + id)
  },
  updateTask (params) {
    return api().put('tasks/' + params.id, params)
  },
  getTask (params) {
    return api().get('task/' + params.id)
  }
}
