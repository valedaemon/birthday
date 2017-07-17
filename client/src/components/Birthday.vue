<template>
  <div class="birthday center-align">
    <h3>Enter your birthday</h3>
    <div class="row">
      <div class="col s6 offset-s3">
        <div class="input-field col s4">
          <v-text-input
            class="inputs"
            name="bmonth"
            v-model="bmonth"
            v-focus.lazy="true">
          </v-text-input>
          <label for="bmonth">Month</label>
          <div class="message">{{ validation.firstError('bmonth') }}</div>
        </div>
        <div class="input-field col s4">
          <v-text-input
            class="inputs"
            name="bday"
            v-model="bday"></v-text-input>
          <label for="bday">Day</label>
          <div class="message">{{ validation.firstError('bday') }}</div>
        </div>
        <div class="input-field col s4">
          <v-text-input
            class="inputs"
            name="byear"
            v-model="byear"></v-text-input>
          <label for="byear">Year</label>
          <div class="message">{{ validation.firstError('byear') }}</div>
        </div>
        <div v-model="fullDate" class="col s12 message">{{ validation.firstError('fullDate') }}</div>
        <div class="col s12">
          <a class="margin-40 btn-large" v-on:click="submit">Submit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {focus} from 'vue-focus';
  import SimpleVueValidation from 'simple-vue-validator';
  let validator = SimpleVueValidation.Validator;
  import moment from 'moment';
  import * as services from '../services';
  export default {
    name: 'birthday',
    directives: {focus: focus},
    data () {
      return {
        user: {},
        bmonth: '',
        bday: '',
        byear: '',
        userbday: '',
        submitted: false,
        focused: true
      }
    },
    validators: {
      bmonth: function(value) {
        return validator.value(value).required().between(1, 12).minLength(2)
      },
      bday: function(value) {
        return validator.value(value).required().between(1, 31).minLength(2)
      },
      byear: function(value) {
        let d = new Date();
        return validator.value(value).required().between(1900, d.getFullYear()).minLength(4)
      },
      'bmonth, bday, byear, fullDate': function(bmonth, bday, byear, fullDate) {
        if (this.submitted || (this.validation.isTouched('bmonth') && this.validation.isTouched('bday') && (this.validation.isTouched('byear') && this.validation.isPassed('byear')))) {
          fullDate = byear + '-' + bmonth + '-' + bday;
          return validator.value(fullDate).custom(function() {
            if (moment(fullDate).isValid() === false) {
              return 'The date you entered is not valid';
            }
          });
        }
      }
    },
    errors () {
      return this.errors.touched ? this.errors.invalid && Object.keys(this.errors).length : false
    },
    methods: {
      submit: function() {
        this.submitted = true;
        this.$validate()
          .then(success => {
            if (success) {
              this.userbday = this.byear + '-' + this.bmonth + '-' + this.bday;
              services.app.authenticate()
                .then(res => {
                  return services.userService.update({_id: res.data._id}, {$set: {birthday: this.userbday}})
                    .then(updateRes => {
                      window.Materialize.toast('Your birthday has been saved!', 5000);
                      this.$router.go(this.$router.currentRoute);
                    })
                    .catch(err => {
                      window.Materialize.toast('There was an error: ' + err, 5000);
                    });
                });
            }
          })
      }
    }
  }
</script>