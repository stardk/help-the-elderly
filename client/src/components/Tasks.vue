<template lang="html">
  <div class="tasks">
    <h1>Свободные задания</h1>
    <div v-if="tasks.length > 0" class="task-div" v-for="task in tasks" v-bind:key="task._id">
      <h3>{{ task.title }}</h3>
      <span>{{ task.datetime }}</span>
      <p>{{ task.description }}</p>
      <a href="mapAddress" id="address">{{ task.address }}</a>
      <div class="buttons">
        <button @click="$router.push({ name: 'EditTask', params: { id: task._id } })" class="manage-task-btn">Редактировать</button>
        <button @click="deleteTask(task._id)" class="manage-task-btn delete-task-btn">Удалить</button>
      </div>
    </div>
    <div v-else>
      Нет доступных заданий
    </div>
  </div>
</template>

<script>
export default {
  name: 'tasks',
  data () {
    return {
      tasks: [],
    }
  },
  async mounted () {
    await this.getTasks()
  },
  methods: {
    async getTasks () {
      await this.$store.dispatch('fetchTasks');
      await this.$store.commit('formatDate');
      this.tasks = this.$store.getters.getTasks;
    },
    async deleteTask (id) {
      await this.$store.dispatch('deleteTask', id);
      this.getTasks();
      this.$router.push({ name: 'Tasks' })
    }
  }
}
</script>
<style lang="css" scoped>
.tasks {
  margin: 5em auto;
  width: calc(100% / 1.3);
  display: flex;
  flex-direction: column;
}
.task-div {
  background-color: rgb(243, 243, 243);
  border-radius: 5em;
/*   padding-bottom: 1em;
 */  margin-bottom: 2em;
  padding-left: calc(100% / 8);
  padding-right: calc(100% / 8);
  text-align: left;
  display: flex;
  flex-direction: column;
}
.task-div > h3 {
  color: #000;
  padding-top: 1em;
  margin-bottom: 0.2em;
}
.task-div > span {
  color: rgb(158, 158, 158);
}
.task-div > p {
  color: #000;
}
#address {
  color: rgba(0,173,217,1);
  text-decoration: none;
}
.manage-task-btn {
  text-align: center;
  background: rgba(114,58,180,1);
  color: #fff;
  border-radius: 2em;
  margin-top: 1.5em;
/*   width: calc(100% / 3);
 */  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
.manage-task-btn:hover {
  color: rgba(0,173,217,1);
}
.manage-task-btn:active {
  margin-top: 0.1em;
}
.delete-task-btn {
  margin-bottom: 2em;
  background: rgb(217, 82, 94);
  color: #fff;
}
.delete-task-btn:hover {
  background: rgb(179, 35, 49);
  color: #fff;
}
.delete-task-btn:active {
  margin-top: 0.1em;
}
@media screen and (max-width: 480px) {
  .tasks {
    width: 100%;
  }
}
</style>
