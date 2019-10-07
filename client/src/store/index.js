import Vuex from 'vuex'
import Vue from 'vue'
import axios from '../services/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    tasks: [],
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getTasks(state) {
      return state.tasks;
    }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    formatDate(state) {
      let tempDate = new Date(state.tasks[0].datetime);
      state.tasks.forEach(task => {
        tempDate = new Date(task.datetime);
        task.datetime = tempDate.toLocaleDateString("ru-RU",
        {
          weekday: 'long',
          year: 'numeric',
          month: '2-digit',
          day: 'numeric'
        });
      })
    },
    setToken(state, token) {
      state.access_token = token;
    }
  },
  actions: {
    async fetchTasks(context) {
      await axios().get('tasks')
      .then(response => {
        context.commit('setTasks', response.data.tasks)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getTaskById(context, id) {
      return axios().get('task/' + id)
    },
    async deleteTask(context, id) {
      console.log(id);
      await axios().delete('tasks/' + id)
      .then(response => {
        console.log(response)
        context.dispatch('fetchTasks')
      })
      .catch(error => {
        console.log(error)
      })
    },
    async updateTask(context, data) {
      await axios().put('tasks/' + data.id, data)
    },
    async signup(context, data) {
      return axios().post('signup', data)
    },
    signin(context, data) {
      return new Promise((resolve, reject) => {
        axios().post('signin', {
          email: data.email,
          password: data.password
        })
        .then(response => {
          const token = response.data.access_token;
          localStorage.setItem('access_token', token);
          context.commit('setToken', token);
          resolve(response);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
      })
    }
  }
})
