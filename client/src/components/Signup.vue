<template lang="html">
  <div class="signup">
    <h1>Регистрация</h1>
    <div class="form">
      <form @submit.prevent="signup">
        <div v-for="(item, index) in info">
          <label>{{ item.label }}<br/>
          <input :type="item.type"
                 :name="item.name"
                 :placeholder="item.placeholder"
                 :key="index"
                 v-model="item.value">
          </label>
          <span v-if="item.showMsg == true">{{ item.msg }}</span>
        </div>
        <div>
          <label>Повторите пароль<br/>
            <input type="password" name="password2" placeholder="" v-model="password2.value">
          </label>
          <span v-if="password2.showMsg == true">{{ password2.msg }}</span>
        </div>
        <div>
          <button class="app_signup_btn">Зарегистрироваться</button>
        </div>
        <p v-if="result">Вы успешно зарегистрировались!
          <router-link :to="{ name: 'Signin' }">Войти</router-link>
        </p>
        <p v-if="result == false">Email уже зарегистрирован</p>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService';
export default {
  name: 'Signup',
  data () {
    return {
      result: null,
      info: [
        {
          type: 'text',
          name: 'name',
          value: '',
          label: 'Имя',
          placeholder: 'Иван',
          filter: /^[А-Яа-яЁё]{1,15}$/,
          msg: 'Не более 10 символов русского алфавита',
          showMsg: false
        },
        {
          type: 'text',
          name: 'surname',
          value: '',
          label: 'Фамилия',
          placeholder: 'Иванов',
          filter: /^[А-Яа-яЁё]{1,15}$/,
          msg: 'Не более 15 символов русского алфавита',
          showMsg: false
        },
        {
          type: 'text',
          name: 'age',
          value: null,
          label: 'Возраст',
          placeholder: '25',
          filter: /^[0-9]{2}$/,
          msg: 'Не менее 18 лет',
          showMsg: false
        },
        {
          type: 'text',
          name: 'email',
          value: '',
          label: 'Email',
          placeholder: 'ivan@mail.ru',
          filter: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
          msg: 'Некорректный email',
          showMsg: false
        },
        {
          type: 'password',
          name: 'password',
          value: '',
          label: 'Пароль',
          placeholder: 'Пароль',
          filter: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
          msg: 'Строчные и прописные латинские буквы, цифры',
          showMsg: false
        }
      ],
      password2: {
        value: '',
        msg: 'Пароли не совпадают',
        showMsg: false
      }
    }
  },
  methods: {
    async signup () {
      let status = this.checkInput();
      console.log("status " + status);
      if (status) {
        this.result = await this.$store.dispatch('signup', {
          name: this.info[0].value,
          surname: this.info[1].value,
          age: this.info[2].value,
          email: this.info[3].value,
          password: this.info[4].value
        });
        console.log(this.result);
        this.result = this.result.data.success;
        console.log(this.result);
      }
    },
    checkInput () {
      let status = true;
      for (let i = 0; i < this.info.length; i++) {
        if (!this.info[i].filter.test(this.info[i].value)) {
          this.info[i].showMsg = true;
          status = false;
        } else {
          this.info[i].showMsg = false;
          status = true;
        }
      }
      if (status) {
        if (this.info[4].value != this.password2.value) {
          this.password2.showMsg = true;
          status = false;
        }
        else this.password2.showMsg = false;
      }
      return status;
    }
  }
}
</script>

<style lang="css" scoped>
.signup {
  margin-top: 5em;
}
.form {
  max-width: 30em;
  margin: 0 auto;
}
form > div {
  /* max-width: 15em; */
  margin: auto;
}
.form input:focus {
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
.form div {
  margin: 20px auto;
}
span {
  font-size: 8px;
}
a {
  color: blue;
  text-decoration: none;
}
.app_signup_btn {
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
.app_signup_btn:hover {
  background: rgba(0,173,217,1);
  color: #fff;
}
.app_signup_btn:active {
  margin-top: 0.1em;
}
</style>
