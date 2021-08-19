import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  // 開發時才用嚴格模式 很耗效能
  // strict: true,
  state: {
    // 1-4 mutations拿到資料
    students: [],
  },
  mutations: {
    // 1-3 在mutations 這地方寫資料 回去
    setStudents(state, data) {
      state.students = data;
    },
    // 2-2 add data
    addStudent(state, data) {
      state.students.push(data);
    },
    //3-4 action 過來 同步資料
    deleteStudent(state, data) {
      //切這1個位置出來
      state.students.splice(data, 1)
    },
    //5-6 來同步資料
    updateStudent(state, { item,stuname,stumail,stusex,birthday }) {
      item.stuname = stuname,
      item.stumail = stumail,
      item.stusex = stusex,
      item.birthday = birthday
    }
  },
  actions: {
    STUDENTS_READ: (context) =>
      // console.log(context)
      // eslint-disable-next-line implicit-arrow-linebreak
      axios.get('http://localhost:7998/students').then((res) => {
        // 1-2 拿到資料 打到mutations
        context.commit('setStudents', res.data);
      }),

    //3-2 delete 傳target 過來action 打api
    CONTENT_DELETE: (context, { target }) => {
      //把丟過來這個target 去state找看看 有沒有
      let index = context.state.students.indexOf(target)
      //沒找到就 return 掉
      if (index == -1) return false
      //有找到就去打 API
      return axios.delete('http://localhost:7998/students/' + target.stuno).then((res) => {
        //3-3 commit 送去 mutation
        context.commit('deleteStudent', index)
      })
    },

    CONTENT_UPDATE: (context,  {stuno,stuname,stumail,stusex,birthday} ) => {

      console.log('UPDATE')
      //5-3 接到input的資料 還有id
      //5-4先看看有沒有資料
      let item = context.state.students.find((item) => {
        return item.stuno == stuno
      })

      //沒找到就 return 掉
      if (!item) return false
      //5-5 有找到就去打 API 塞資料 這個stuno 跟他的資料
      return axios.put('http://localhost:7998/students/' + item.stuno, {
        stuname: stuname,
        stumail: stumail,
        stusex: stusex,
        birthday: birthday,
      }).then((res) => {
        context.commit('updateStudent', { item,stuname,stumail,stusex,birthday })
      })
    }
  }
});
