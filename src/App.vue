<template>
  <div id="app">
    <Navbar />
    <router-view>
      <Dashboard />
      <AddRecipe />
    </router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddRecipe from "./components/AddRecipe";
import router from "../src/router";

export default {
  name: "App",
  components: {
    Navbar,
    Dashboard,
    AddRecipe
  },
  router: router
};
</script>

<style>
</style>