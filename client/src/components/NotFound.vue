<template>
  <div class="notfound">
    <div class="row ohthehorror valign-wrapper">
      <div class="col s12">
        <div class="center-align">
          <img src="../../static/img/demonhead-outline.png" class="responsive-img">
        </div>
        <h2 class="center-align">
          {{ msg }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'globalFooter',
    data () {
      return {
        msg: 'Sorry, the page you requested does not exist.'
      }
    }
  }
</script>

<style scoped>
  .ohthehorror {
    min-height: 400px;
  }
  .icon-horror {
    font-size: 10rem;
  }
</style>