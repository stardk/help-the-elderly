<template lang="html">
  <div class="signin">
    <h1>Авторизация</h1>
    <div class="form">
      <form @submit.prevent="signin">
        <div>
          <label>Email<br/>
            <input type="text" name="email" placeholder="ivan@mail.ru" v-model="email">
          </label>
        </div>
        <div>
          <label>Пароль<br/>
            <input type="password" name="password" placeholder="Пароль" v-model="password">
          </label>
        </div>
        <div>
          <button class="app_signin_btn">Войти</button>
        </div>
      </form>
      <p>Еще не зарегистрированы?
      <router-link :to="{name:'Signup'}">Присоединяйтесь!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signin () {
      let result = await this.$store.dispatch('signin', {
        email: this.email,
        password: this.password
      });
      console.log(result);
      console.log(result);
    }
  },
  mounted () {
    console.log(this.$router.papams);
  }
}
</script>

<style lang="css" scoped>
.signin {
  margin-top: 5em;
}
.form {
  max-width: 30em;
  margin: 0 auto;
}
form > div {
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
p {
  font-size: 0.9rem;
}
span {
  font-size: 8px;
}
a {
  color: rgba(0,173,217,1);
  text-decoration: underline;
  text-decoration-style: dotted;
}
a:hover {
  text-decoration-style: solid;
}
.app_signin_btn {
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
.app_signin_btn:hover {
  background: rgba(0,173,217,1);
  color: #fff;
}
.app_signin_btn:active {
  margin-top: 0.1em;
}
</style>
