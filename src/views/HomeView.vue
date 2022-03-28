<template>
  <div class="home">
    <h1 class="text-3xl font-bold underline">
      Current Weather App
    </h1>
    <form @submit.prevent>
      <label for="city">City:</label>
      <input id="city" type="text" v-model="query" class="px-5 py-2 m-2 border-4 rounded-2xl" autofocus>
      <button type="button" @click="getForecast">Search</button>
    </form>
    <div v-if="results!=null">
      {{ forecast.name }}
    </div>
    <div class="flex">
      <p class="text-2xl font-bold"> {{ time }}</p>
    </div>
  </div>
</template>

<script>
import fetchData from "@/index";
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {},
  data: () => ({
    query: null,
    results: null,
    now: new Date()
  }),
  mounted() {
    setInterval(() => this.getTime(), 1000)
    setInterval(() => {
      if  (this.query == null) {
        const q = 'Bogota';
        this.query = q;
        fetchData(q)
            .then(r => this.results = r)
            .catch(e => console.error(e))
      } else {
        fetchData(this.query)
            .then(r => this.results = r)
            .catch(e => console.error(e))
      }
    }, 10000)
  },
  computed: {
    weather() {
      return this.results.weather[0]
    },
    forecast() {
      return this.results
    },
    time() {
      return `${this.now.getHours()}: ${this.now.getMinutes()}: ${this.now.getSeconds()} `
    }
  },
  methods: {
    getForecast() {
      fetchData(this.query)
          .then(r => this.results = r)
          .catch(e => console.error(e))
    },
    getTime() {
      this.now = new Date();
    }
  }
}
</script>

<style>
#city {
  outline: none;
}
</style>
