<template lang="html">
  <div id="app">
    <div class="container">
      <header>
        <input type="checkbox" id="menu-mobile"/>
        <nav role="navigation">
          <label for="menu-mobile" class="toggle-button">Меню</label>
          <label for="menu-mobile" class="close-menu">X</label>
          <ul class="main-menu">
            <li><router-link :to="{name:'About'}">О сайте</router-link></li>
            <li><router-link :to="{name:'Tasks'}">Задания</router-link></li>
            <li><router-link :to="{ name: 'Rating'}">Рейтинг</router-link>
            <li v-if="signedIn" id="signin"><router-link :to="{name:'Profile'}">Профиль</router-link></li>
            <li v-else id="signin"><router-link :to="{name:'Signin'}">Войти</router-link></li>
          </ul>
        </nav>
      </header>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './css/style.css';
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  border-radius: 1em;
  margin: 0 auto;
  padding-bottom: 8em;
  background: linear-gradient(229deg, rgba(114,58,180,1) 11%, rgba(0,173,217,1) 100%);
}
</style>
