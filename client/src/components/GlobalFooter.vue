<template>
  <div class="global-footer">
    <v-footer class="indigo darken-1">
      <div class="container" slot="content">
        <div class="row">
          <div class="col s4">

          </div>
        </div>
      </div>
      <div class="container" slot="copyright">
        <div class="left margin-40">
          &copy; Copyright 2017 <span class="southspan">Birthday Food Checker!</span>
        </div>
        <div class="right">
          <ul class="socialicons">
            <li>
              <a href="#" target="_blank"><span><i class="mdi mdi-twitter"></i></span></a>
            </li>
          </ul>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>
  export default {
    name: 'globalFooter',
    data () {
      return {
        message: 'Test message'
      }
    }
  }
</script>

<style>
  .margin-40 {
    margin-top: 40px;
  }
  .socialicons li {
    padding-right: 20px;
    display: inline;
  }
  .socialicons li i {
    font-size: 3rem;
    color: red;
  }
  @media only screen and (min-width: 993px) {
    .container { width: 90% !important; }
  }
</style>