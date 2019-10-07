<template lang="html">
  <div class="tasks">
    <h1>Редактировать задание</h1>
    <div class="form">
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
        <input type="text" name="dateday" placeholder="Число" v-model="formattedDate.dateday">
      </div>
      <div>
        <select v-model="formattedDate.datemonth">
          <option disabled value="">Выберите месяц</option>
          <option v-for="month in months">{{ month }}</option>
        </select>
      </div>
      <div>
        <button class="app_post_btn" @click="updateTask()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import TasksService from '@/services/TasksService'
export default {
  name: 'EditTask',
  data () {
    return {
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
      'Ноябрь', 'Декабрь'],
      title: '',
      description: '',
      address: '',
      datetime: '',
      istaken: false,
      formattedDate: {
        dateday: 0,
        datemonth: '',
        dateyear: 0
      }
    }
  },
  methods: {
    async getTask () {
      const response = await this.$store.dispatch('getTaskById', this.$route.params.id);
      this.title = response.data.title;
      this.description = response.data.description;
      this.address = response.data.address;
      this.datetime = response.data.datetime;
      this.istaken = response.data.istaken;
    },
    async updateTask () {
      await this.formatDateOut();
      await this.$store.dispatch('updateTask', {
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        address: this.address,
        datetime: this.datetime,
        istaken: this.istaken
      });
      this.$router.push({ name: 'Tasks' });
    },
    formatDateIn () {
      const tempDate = new Date(this.datetime);
      this.formattedDate.dateday = tempDate.getDate();
      this.formattedDate.datemonth = this.months[tempDate.getMonth()];
      this.formattedDate.dateyear = tempDate.getFullYear();
    },
    formatDateOut () {
      this.datetime = `${this.formattedDate.dateyear}-${this.months.indexOf(this.formattedDate.datemonth) + 1}-${this.formattedDate.dateday}`;
    }
  },
  async mounted () {
    await this.getTask();
    await this.formatDateIn();
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
.app_post_btn {
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
.app_post_btn:hover {
  background: rgba(0,173,217,1);
  color: #fff;
}
.app_post_btn:active {
  margin-top: 0.1em;
}
</style>
