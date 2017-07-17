<template>
  <div class="hello">
    <div v-if="!user.birthday" class="col s12">
      <v-birthday></v-birthday>
    </div>
    <div v-if="user.birthday" class="col s12">
      <div class="center-align">
        <img src="../../static/img/cake.png" height="200">
        <h3>
          Birthday Food Checker!
        </h3>
      </div>
      <div class="card-panel indigo darken-3 whitetext">
        Hello {{ user.firstName }} {{ user.lastName }}! Based on the last five years (from the month and date of your birthday), you may want to be careful of the
        following types of cake and ice cream:
      </div>
      <div class="loading center-align" v-if="loading">
        <v-progress-circular active large></v-progress-circular>
      </div>
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <div class="row">
        <div v-for="result in results" class="col s12">
          <div class="card red darken-1">
            <div class="card-content">
              <div class="card-title">
                {{ result.product_description }}
              </div>
              <p class="description">
                {{ result.reason_for_recall }}
              </p>
            </div>
            <div class="card-action">
              Status: {{ result.status }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <v-pagination color="blue" v-if="pagControls" :length="pagLength" v-model="active" class="center-align"
                      v-on:input="setPage($event)"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Birthday from './Birthday.vue';
import * as services from '../services';
import axios from 'axios';
export default {
  name: 'home',
  components: {
    'v-birthday': Birthday
  },
  data () {
    return {
      user: {},
      birthday: '',
      loading: false,
      results: [],
      total: '',
      skip: 0,
      limit: 10,
      active: 1,
      pagControls: false,
      pagLength: '',
      error: ''
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      services.app.authenticate()
        .then(res => {
          this.user = res.data;
          if (this.user.birthday) {
            this.birthday = this.user.birthday;
            this.getBadFoods(this.user.birthday);
          }
        })
        .catch(err => {
          this.error = err;
          this.$router.replace('/login');
        })
    },
    getBadFoods(bday) {
      this.loading = true;
      let formattedBDay = bday.replace(/-/g, '');
      let monthDay = formattedBDay.substring(4, formattedBDay.length);
      let d = new Date();
      let currentYear = d.getFullYear();
      let minusFive = currentYear - 5;
      let ranges = '[' + minusFive + monthDay + '+TO+' + currentYear + monthDay + ']';
      let url = 'https://api.fda.gov/food/enforcement.json?search=report_date:' +
        ranges + '+reason_for_recall:"ice+cream"+reason_for_recall:"cake"&limit=' + this.limit +
        '&skip=' + this.skip;
      axios.get(url)
        .then(res => {
          this.results = res.data.results;
          this.total = res.data.meta.results.total;
          this.skip = res.data.meta.results.skip;
          this.limit = res.data.meta.results.limit;
          this.loading = false;
          if (this.total > this.limit) {
            this.pagControls = true;
            this.pagLength = Math.round(this.total / this.limit);
          }
          return this.results;
        })
        .catch(err => {
          this.error = err;
        })
    },
    setPage(page) {
      this.loading = true;
      let perPage = this.limit;
      this.active = page;
      this.skip = (page * perPage) - page;
      this.getBadFoods(this.birthday);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .southspan {
    font-family: 'Fontdiner Swanky', cursive;
    color: red;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .no-top {
    margin-top: 0 !important;
  }
  .hello {
    min-height: 600px;
  }
  .whitetext {
    color: #FFF !important;
  }
  .description {
    background-color: #FFF;
    padding: 20px;
  }
  .card-title {
    font-size: 18px;
    font-weight: bolder;
  }
</style>
