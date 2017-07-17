<template>
  <div class="hello">
    <div v-if="!user.birthday" class="col s12">
      <v-birthday></v-birthday>
    </div>
    <div v-if="user.birthday" class="col s12">
      <div class="center-align">
        <img src="../../static/img/cake.png" height="200">
        <h3>
          Birthday Checker!
        </h3>
      </div>
      <div>
        Based on the last five years (from the month and date of your birthday), you may want to be careful of the
        following types of ice cream:
      </div>
    </div>
  </div>
</template>

<script>
import Birthday from './Birthday.vue';
import * as services from '../services';
export default {
  name: 'home',
  components: {
    'v-birthday': Birthday
  },
  data () {
    return {
      user: {},
      birthday: ''
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      services.app.authenticate()
        .then(res => {
          console.log('RES', res.data);
          this.user = res.data;
          if (this.user.birthday) {
            this.getBadFoods(this.user.birthday);
          }
        })
    },
    getBadFoods(bday) {
      console.log(bday);
      let formattedBDay = bday.replace(/-/g, '');
      let monthDay = formattedBDay.substring(4, formattedBDay.length);
      let d = new Date();
      let currentYear = d.getFullYear();
      let minusFive = currentYear - 5;
      console.log('formatted', formattedBDay, monthDay);
      console.log('years', currentYear, minusFive);
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
    min-height: 800px;
  }
</style>
