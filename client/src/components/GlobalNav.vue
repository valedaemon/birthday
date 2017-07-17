<template>
  <div class="global-nav">
    <nav class="nav-extended">
      <v-nav fixed nav-class="nav-wrapper indigo darken-3 left">
        <a href="/" class="brand-logo" slot="logo">
          <span class="southspan">Birthday Food Checker!</span>
        </a>
        <ul class="right hide-on-small-only">
          <li v-if="loggedIn">
            <router-link to="/logout">Log out</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link to="/login">Log In</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link to="/signup">Sign Up</router-link>
          </li>
        </ul>
      </v-nav>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'globalNav',
    data () {
      return {
        loggedIn: !!window.localStorage.getItem('feathers-jwt'),
        nav: {
          edge: 'left'
        }
      }
    },
    watch: {
      '$route': 'checkAuth'
    },
    methods: {
      checkAuth() {
        this.loggedIn = !!window.localStorage.getItem('feathers-jwt')
      }
    }
  }
</script>

<style src="../assets/css/materialdesignicons.css"></style>
<style scoped>
  .brand-logo {
    margin-left: 20px;
  }
  .nav-content {
    background-color: #ccc;
  }
  .nav-content .tabs .tab {
    background-color: #ccc;
  }
  .nav-content .tabs .tab .active {
    background-color: #ccc;
  }
  a.active {
    background-color: #ccc !important;
  }
  .nav-content .tabs .tab a {
    color: #1565C0;
    font-weight: bolder;
  }
  .nav-content .tabs .tab .router-link-active {
    background-color: #1565C0;
    color: #fff;
    font-weight: bolder;
  }
  @media only screen and (max-width: 992px) {
    nav .brand-logo {
      left: 20% !important;
    }
  }
</style>
