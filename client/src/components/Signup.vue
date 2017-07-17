<template>
  <div class="signup">
    <h2>
      Sign up for UGR!
    </h2>
    <h4>{{successMessage}}</h4>
    <form class="col s12">
      <div class="input-field">
        <v-icon prefix>account_circle</v-icon>
        <v-text-input name="email" v-model="email" id="email" type="email" :class="{invalid: validation.hasError('email')}"></v-text-input>
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
      <div class="input-field">
        <v-icon prefix>perm_identity</v-icon>
        <v-text-input name="firstName" v-model="firstName" id="firstName" class="validate" :class="{invalid: validation.hasError('firstName')}"></v-text-input>
        <label for="firstName">
          First Name
        </label>
        <div class="message">{{ validation.firstError('firstName') }}</div>
      </div>
      <div class="input-field">
        <v-icon prefix>perm_identity</v-icon>
        <v-text-input name="lastName" v-model="lastName" id="lastName" :class="{invalid: validation.hasError('lastName')}"></v-text-input>
        <label for="lastName">
          Last Name
        </label>
        <div class="message">{{ validation.firstError('lastName') }}</div>
      </div>
      <div class="row">
        <v-btn large waves-effect><span v-on:click="signup">Signup</span></v-btn>
      </div>
    </form>
  </div>
</template>

<script>
  import * as services from '../services';
  import SimpleVueValidation from 'simple-vue-validator';
  let Validator = SimpleVueValidation.Validator;
  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        successMessage: ''
      }
    },
    errors () {
      return this.errors.touched ? this.errors.invalid && Object.keys(this.errors).length : false
    },
    validators: {
      email: function(value) {
        return Validator.value(value).required().email();
      },
      password: function(value) {
        return Validator.value(value).required().minLength(8);
      },
      firstName: function(value) {
        return Validator.value(value).required().minLength(2);
      },
      lastName: function(value) {
        return Validator.value(value).required().minLength(2);
      }
    },
    methods: {
      signup() {
        this.$validate()
          .then(success => {
            if (success) {
              console.log('Validation succeeded!');
              return services.userService.create({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
              })
                .then(this.email = '')
                .then(this.password = '')
                .then(this.firstName = '')
                .then(this.lastName = '')
                .then(this.successMessage = 'Thank you for registering with UGR!')
                .then(this.signupSuccess())
                .catch(function (err) {
                  window.Materialize.toast(err, 4000);
                })
            } else {
              window.Materialize.toast('You must enter all information', 4000);
            }
          })
      },
      signupSuccess() {
        this.$router.replace('/login');
      }
    }
  }
</script>

<style>
  .signup {
    min-height: 800px;
    padding: 50px;
  }
  h2 {
    margin-bottom: 4rem !important;
  }
</style>
