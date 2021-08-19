<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <p>
         <router-link to="/add">
         <v-btn   color="purple lighten-1" dark>
           add Student
         </v-btn>
       </router-link>

      </p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Name</th>
              <th class="text-left">Mail</th>
              <th class="text-left">Sex</th>
              <th class="text-left">Birthday</th>
              <th class="text-left">修改</th>
              <th class="text-left">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in students" :key="item.id">
              <td>{{ item.stuno }}</td>
              <td>{{ item.stuname }}</td>
              <td>{{ item.stumail }}</td>
              <td>{{ item.stusex }}
              <td>{{ item.birthday }}</td>
              <!--<td>{{ item.birthday | dateFormat }}</td>-->
              <td>
                <v-btn  color="success" dark
                v-on:click="updateHandler(index)">
                  <v-icon left> mdi-pencil </v-icon>
                  Edit
                </v-btn>
              </td>
              <td>
                 <v-btn   color="error" dark
                 v-on:click="deleteHandler(index)">
                   delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
     // 除理過的資料 有get/set可以用
     students() {
      return this.$store.state.students.map( (d) => {
        d.birthday = dayjs(d.birthday).format('YYYYMMDD')
        return d;
      })
    }
  },
  methods:{
      deleteHandler(index){
          //拿index 去拿資料庫資料 不是前端的資料
          let target = this.students[index]
          //刪除要加id 不可能全部都刪

          //3-1 要用VUEX 完整的走過 傳整包東西過去 再處理
          this.$store.dispatch('CONTENT_DELETE',{target})
      },
        updateHandler(index){
          //轉到update頁 給使用者打完更新
          let target = this.students[index]
          this.$router.push({name:'Edit',params:{stuno:target.stuno}});
      }
  }
};
</script>
