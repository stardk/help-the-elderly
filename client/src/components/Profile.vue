<template lang="html">
  <div class="profile">
    <h1>Ваш профиль</h1>
    <div class="flex-container">
      <div class="sidebar-menu">
        <ul>
          <li>Мои задания</li>
          <li>Мои отчеты</li>
          <li>Редактировать профиль</li>
          <li>Выйти из аккаунта</li>
        </ul>
      </div>
      <div class="profile-content">
        <div class="task-div">
          <h3>Отчет по заданию:<span class="task-title"> Нужна помощь Галине Петровне</span></h3>
          <span>Создан: суббота, 24.08.2019 г.</span>
          <p>Прибыл в квартиру к Галине Петровне в 12:00. К 13 часам оплатил телевидение, уборка заняла 2,5 часа</p>
          <p>Оценка задания: 5</p>
          <button class="app_task_btn">Изменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
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
      await TasksService.deleteTask(id);
      this.getTasks();
      this.$router.push({ name: 'Tasks' })
    }
  }
}
</script>
<style lang="css" scoped>
.profile {
  margin: 5em auto;
  width: calc(100% / 0.9);
}
.task-title {
  color: rgba(0,173,217,1);
}
.task-div {
  width: 60%;
  background-color: rgb(243, 243, 243);
  border-radius: 5em;
  padding-bottom: 1em;
}
li {
  list-style: none;
  padding-bottom: 1em;
  padding-right: 1em;
  font-size: 1.1em;
  border-right: 1px solid #fff;
}
li:hover {
  color: rgb(210, 210, 210);
  cursor: pointer;
}
li:nth-child(2) {
  color: rgba(0,173,217,1);
}
.task-div {
  margin-left: 3em;
  margin-bottom: 1.5em;
  padding-left: calc(100% / 12);
  padding-right: calc(100% / 12);
  text-align: left;
}
.flex-container {
  display: flex;
  justify-content: space-between;
}
.sidebar-menu {
  justify-content: space-between;
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
.app_task_btn {
  background: rgba(114,58,180,1);
  color: #fff;
  border-radius: 2em;
  margin: 0.1em auto;
  /* margin-top: 1em; */
  width: 15em;
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
.app_task_btn:hover {
  color: rgba(0,173,217,1);
}
.app_task_btn:active {
  margin-top: 0.1em;
}
.app_delete_btn {
  margin-left: 1.5em;
  background: rgb(217, 82, 94);
  color: #fff;
}
.app_delete_btn:hover {
  background: rgb(179, 35, 49);
  color: #fff;
}
.app_delete_btn:active {
  margin-top: 0.1em;
}
</style>
