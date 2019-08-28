<template>
  <div>
    <ul>
      <li>
        <router-link :to="world">Hello World</router-link>
      </li>
      <li>
        <router-link :to="earth">Hello Earth</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      world: {
        name: "world",
        params: {
          msg: "你好世界"
        }
      },
      earth: {
        name: "earth",
        params: {
          msg: "你好地球"
        }
      }
    };
  }
};
</script>

<style scoped>
ul {
  display: flex;
  max-width: 400px;
  justify-content: space-between;
  margin: 0 auto;
}

li {
  list-style: none;
  display: inline-block;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>