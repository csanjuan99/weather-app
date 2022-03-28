<template>
  <nav class="bg-white shadow-lg rounded-3xl p-5 m-3 flex justify-center items-center">
    <router-link to="/"><div class="flex flex-col justify-center items-center mx-2">
      <img width="24" src="./static/home.png" alt="Home">
      <p>Home</p>
    </div>
    </router-link>
    <router-link to="/about"><div class="flex flex-col justify-center items-center mx-2">
      <img width="24" src="./static/home.png" alt="Home">
      <p>About</p>
    </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "navComponent",
}
</script>

<style scoped>

</style>