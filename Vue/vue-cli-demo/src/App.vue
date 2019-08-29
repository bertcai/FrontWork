<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Parent />
    <hr>
    <Out />
  </div>
</template>

<script>
import List from "./components/List";
import Parent from "./components/Parent";
import Out from "./components/Out";
export default {
  name: "app",
  data() {
    return {
      data: null
    };
  },
  components: {
    List,
    Parent,
    Out
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
