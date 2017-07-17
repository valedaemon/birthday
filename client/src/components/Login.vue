<template>
  <div class="login">
    <h2>
      Login
    </h2>
    <h4>
      Or <router-link to="/signup">Sign Up</router-link>
    </h4>
    <p v-if="$route.query.redirect">
      You need to login first
    </p>

    <p v-if="error" class="error">
      Incorrect email or password
    </p>

    <form class="col s12">
      <div class="input-field">
        <v-icon prefix>account_circle</v-icon>
        <v-text-input name="email" v-model="email" id="email" :class="{invalid: validation.hasError('email')}"></v-text-input>
        <label for="email">
          Email Address
        </label>
        <div class="message">{{ validation.firstError('email') }}</div>
      </div>
      <div class="input-field">
        <v-icon prefix>https</v-icon>
        <v-text-input name="password" v-model="password" id="password" type="password" :class="{invalid: validation.hasError('password')}"></v-text-input>
        <label for="password">
          Password
        </label>
        <div class="message">{{ validation.firstError('password') }}</div>
      </div>
      <div class="row">
        <v-btn large waves-effect><span v-on:click="login">Login</span></v-btn>
      </div>
    </form>
  </div>
</template>

<script>
  import * as services from '../services';
  import SimpleVueValidation from 'simple-vue-validator';
  let Validator = SimpleVueValidation.Validator;
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        error: false
      }
    },
    errors () {
      return this.errors.touched ? this.errors.invalid && Object.keys(this.errors).length : false
    },
    validators: {
      email: function(value) {
        console.log('value', value);
        return Validator.value(value).required().email();
      },
      password: function(value) {
        return Validator.value(value).required();
      }
    },
    methods: {
      login() {
        this.$validate()
          .then(success => {
            if (success) {
              console.log('Validation succeeded!');
              return services.app.authenticate({
                type: 'local',
                'email': this.email,
                'password': this.password
              })
                .then(this.loginSuccess)
                .catch(this.loginError)
            } else {
              window.Materialize.toast('You did not fill out the form properly. Please check the error messages and try ' +
                'again.', 4000);
            }
          });
      },
      loginSuccess() {
        this.$router.replace(this.$route.query.redirect || '/');
      },
      loginError() {
        this.error = true;
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
  .login {
    min-height: 800px;
    padding: 50px;
  }
  h2 {
    margin-bottom: 4rem !important;
  }
  .message {
    position: absolute;
    top: 50px;
    left: 45px;
    font-size: smaller;
    color: red;
  }
</style>
