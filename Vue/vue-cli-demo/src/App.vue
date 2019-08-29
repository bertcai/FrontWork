<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <list></list>
    <router-view></router-view>
    <button @click="getData()">获取数据</button>
    <ul>
      <li v-for="item in data" :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
import List from "./components/List";
export default {
  name: "app",
  data() {
    return {
      data: null
    };
  },
  components: {
    List
  },
  methods: {
    getData() {
      // this.$http.get('/topics',{
      //   page:'1',
      //   limit:'20'
      // }).then((res)=>{
      //   this.data = res.data.data
      //   console.log(this.data)
      // }).catch((err)=>{
      //   console.log(err)
      // })
      this.$http
        .post("/message/mark_all", {
          accesstoken: "ea895aa3-9730-49fd-b192-6ba77a134112"
        })
        .then(res => {
          this.data = res.data;
          console.log(this.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
