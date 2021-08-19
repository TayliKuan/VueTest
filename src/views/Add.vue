<template>
  <div class="add">
    <h1>This is an add page</h1>
       <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="stuname"
                :rules="nameRules"
                :counter="10"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="stumail"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="stusex"
                :counter="10"
                label="Sex"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="birthday"
                :counter="8"
                :rules="birthdayRules"
                label="西元年 birthday"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
       <v-btn
       :disabled="!valid"
       color="orange" dark
         v-on:click="createHandler">CREATE
       </v-btn>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      stuname: '',
      stumail: '',
      stusex: '',
      birthday: '',
       valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
      ,
       birthdayRules:[
        v => !!v || 'birthday is required',
        v => /\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/.test(v)  || 'birthday must be valid',
      ]
    };
  },
  methods: {
    createHandler() {
      // this => vue (es6 用箭頭函式 箭頭函式會繼承外面的this 如果用以前的多一層function this會跑掉!!!)
      if (!this.stuname) return false;
      if (!this.stumail) return false;
      if (!this.stusex) return false;
      if (!this.birthday) return false;

      // 新增 直接打API 不用在store先去撈資料 只要塞資料 要給一包資料 在同步回去store
      axios.post('http://localhost:7998/students', {
        stuname: this.stuname,
        stumail: this.stumail,
        stusex: this.stusex,
        birthday: this.birthday,
      }).then((res) => {
        // 清空畫面輸入
        this.stuname = '';
        this.stumail = '';
        this.stusex = '';
        this.birthday = '';

        // 不可以直接把API拿到的資料PUSH回去
        // 2-1 要走VUEX的流程 mutations 去push
        this.$store.commit('addStudent', res.data);
        this.$router.push({name:'Home'});
      });
    },
  },
};
</script>
