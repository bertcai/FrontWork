<template>
  <div class="hello">
    <h1>HelloEarth</h1>
    <h2>{{$route.params.msg}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloEarth",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
