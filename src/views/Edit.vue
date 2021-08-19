<template>
  <div class="edit">
      <h1>This is an edit page</h1>
       <v-form
         v-model="valid"
         ref="form"
         lazy-validation
       >
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
         v-on:click="updateHandler">UPDATE
       </v-btn>
  </div>
</template>
<script>
import * as dayjs from 'dayjs'
export default {
  data() {
    return {
      // 4-1 給他一個自己頁面的變數 去綁定
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
    computed:{
        student(){//4-2 先來找資料 去this.$store.state.students 這個陣列裡 找
            //用find 會回傳第一個 或是用filter回傳陣列 再get[0]
            return this.$store.state.students.find((item)=>{
                //4-3 找這個id 要跟 this.$route.params.id一樣的 (updateHandler 的params)
               return item.stuno == this.$route.params.stuno
            })
         }
    },
    methods:{
        updateHandler(){
            //5-1 run 一次 vuex life cycle
             this.$store.dispatch('CONTENT_UPDATE',{
                //5-2 傳input的資料 還有id 過去store
                //拿自己這頁DATA的值
                stuno:this.$route.params.stuno,
                stuname:this.stuname,
                stumail:this.stumail,
                stusex:this.stusex,
                birthday:this.birthday,
            }).then(()=>{
                //做完更新後 push回首頁
                this.$router.push({path:'/'})
            })
        }
    },
    mounted(){
        //4-4 沒有找到id 就導頁回去跟目錄 不用push
        //因為不希望回去錯誤頁面 這是錯誤處理 所以用replace
        //student 是 computed過來的
        if(!this.student) return this.$router.replace({path:'/'})
        //4-5 有找到id
        this.stuname = this.student.stuname
        this.stumail = this.student.stumail
        this.stusex = this.student.stusex
        this.birthday = dayjs(this.student.birthday).format('YYYYMMDD')
        //this.birthday = this.$options.filters.dateFormat(this.student.birthday)
  }

};
</script>
