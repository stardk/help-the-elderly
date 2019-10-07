<template lang="html">
  <div class="tasks">
    <h1>Добавить задание</h1>
    <div @submit.prevent="addTask()" class="form">
      <div>
        <input type="text" name="title" placeholder="Заголовок" v-model="title">
      </div>
      <div>
        <textarea name="description" rows="15" cols="15" placeholder="Описание" v-model="description"></textarea>
      </div>
      <div>
        <input type="text" name="address" placeholder="Адрес" v-model="address">
      </div>
      <div>
        <input type="text" name="dateday" placeholder="Число" v-model="dateday">
      </div>
      <div>
        <select v-model="datemonth">
          <option disabled value="">Выберите месяц</option>
          <option v-for="month in months">{{ month }}</option>
        </select>
      </div>
      <div>
        <button @click="addTask()" class="app_add_btn">Добавить задание</button>
      </div>
    </div>
  </div>
</template>

<script>
import TasksService from '@/services/TasksService'
export default {
  name: 'NewTask',
  data () {
    return {
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
      'Ноябрь', 'Декабрь'],
      title: '',
      description: '',
      address: 'Санкт-Петербург, ',
      dateday: '',
      datemonth: '',
      istaken: false
    }
  },
  methods: {
    async addTask () {
      let datetime = this.getDate();
      await TasksService.addTask({
        title: this.title,
        description: this.description,
        address: this.address,
        datetime: datetime,
        istaken: this.istaken
      });
      this.$router.push({ name: 'Tasks' });
    },
    getDate () {
      let dateyear = new Date().getFullYear();
      let monthDigit = this.months.indexOf(this.datemonth) + 1;
      let fullDate = `${monthDigit}-${this.dateday}-${dateyear}`;
      console.log(fullDate);
      return fullDate;
    }
  }
}
</script>

<style lang="css" scoped>
.tasks {
  margin-top: 100px;
}
.form {
  max-width: 30em;
  margin: 0 auto;
}
form > div {
  /* max-width: 15em; */
  margin: auto;
}
.form input:focus, .form textarea:focus, .form select:focus {
  border: 2px solid rgb(114,58,180);
}
.form input, .form textarea {
  width: 20em;
  padding: 10px;
  border: 2px solid #e0dede;
  border-radius: 2em;
  outline: none;
  font-size: 12px;
}
.form select {
  width: 22em;
  padding: 10px;
  border: 2px solid #e0dede;
  border-radius: 2em;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 10px auto;
}
.app_add_btn {
  background: #fff;
  color: rgba(114,58,180,1);
  border-radius: 2em;
  margin: 0 auto;
  width: inherit;
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
.app_add_btn:hover {
  background: rgba(0,173,217,1);
  color: #fff;
}
.app_add_btn:active {
  margin-top: 0.1em;
}
</style>
