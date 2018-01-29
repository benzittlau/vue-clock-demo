<template>
  <div id="app">
    <img id="logo" src="clock.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo {
  width: 200px;
  height: 200px;
  padding: 30px;
}

</style>
