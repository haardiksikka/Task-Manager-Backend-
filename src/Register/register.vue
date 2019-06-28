<template>
  <div>
    <v-app>
      <main>
        <v-container fluid fill-height style="padding-top:55px">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-title class="white--text">
                  <h4>Register</h4>
                </v-toolbar-title>
                <v-toolbar-items/>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                    <v-form v-model="valid" ref="form">
                      <v-text-field
                        label="Enter your First Name"
                        :rules="firstNameRules"
                        v-model="firstname"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Enter your Last Name"
                        :rules="secondNameRules"
                        v-model="lastname"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Enter your e-mail address"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Enter your password"
                        v-model="password"
                        min="5"
                        :append-icon="e1 ? 'visibility_off' : 'visibility'"
                        :append-icon-cb="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                      ></v-text-field>
                      <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'Robot waala check lagaya??!']"
                        label="I am not a Robot :D"
                        required
                      ></v-checkbox>
                      <v-layout justify-space-between>
                        <v-btn
                          @click="register"
                          :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                        >Register</v-btn>
                        <router-link to="/">Back</router-link>
                      </v-layout>
                    </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';

export default {
  data() {
    return {
      postBody: {},
      valid: false,
      checkbox: false,
      e1: true,
      firstname: '',
      lastname: '',
      firstNameRules: [v => !!v || 'First Name is Required'],
      secondNameRules: [v => !!v || 'Last Name is Requires'],
      password: '',
      passwordRules: [v => !!v || 'Password is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
          || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        // console.log(this.email+' '+this.password);
        this.postBody = Object.assign({
          FirstName: this.firstname,
          LastName: this.lastname,
          Email: this.email,
          Password: this.password,
        });
        axios
          .post('https://localhost:44389/api/user/register', this.postBody)
          .then((response) => {
            console.log(response.data);
            alert('Registered Successfully');
            this.$router.push({ name: 'Login' });
          })
          .catch((e) => {
            console.log(e);
            alert('Error while creating user');
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>
