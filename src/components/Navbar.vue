<template>
  <nav class="grey darken-4">
    <div class="nav-wrapper">
      <router-link :to="{name: 'Dashboard'}" class="brand-logo">Resepi</router-link>
      <a href class="btn-floating btn-large waves-effect red right">
        <router-link :to="{name: 'AddRecipe'}">
          <i class="material-icons">add</i>
        </router-link>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {}
};
</script>

<style scoped>
nav {
  padding: 0 20px;
}
</style>
