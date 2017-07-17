<template>
  <div id="app">
    <global-nav></global-nav>
    <template v-if="$route.matched.length">
      <div class="content">
        <router-view></router-view>
      </div>
    </template>
    <global-footer></global-footer>
  </div>
</template>

<script>
import Home from './Home'
import globalNav from './GlobalNav'
import globalFooter from './GlobalFooter'

export default {
  name: 'app',
  data () {
    return {
      message: 'Test message'
    }
  },
  components: {
    Home,
    globalNav,
    globalFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}
  .content {
    padding: 20px 40px;
  }
  a {
    color: red;
  }
  .southspan {
    font-family: 'Fontdiner Swanky', cursive;
    color: red;
  }
</style>
