<template>
  <div class="home h-screen">
    <div class="h-screen">
      <form @submit.prevent>
        <label for="city">City:</label>
        <input id="city" type="text" v-model="query" class="px-5 py-2 m-2 border-4 rounded-2xl" autofocus>
        <button type="button" @click="getForecast">Search</button>
      </form>
      <div v-if="results!=null">
        <div class="main-info shadow-lg flex flex-col items-start bg-white rounded-3xl p-5 m-5">
          <h1 class="text-4xl font-bold">{{ forecast.name }}</h1>
          <div class="w-full flex flex-col items-start">
            <div class="grid grid-cols-2">
              <div class="flex flex-col items-start justify-center">
                <div class="flex items-center">
                  <p class="text-6xl font-bold">{{ forecast.main.temp }}</p>
                  <span class="text-lg">°C</span>
                </div>
                <p class="text-gray-500 font-bold text-xl">
                  {{
                    `${formatTimeZone(forecast.timezone).getHours()}: ${formatTimeZone(forecast.timezone).getMinutes()}: ${formatTimeZone(forecast.timezone).getSeconds()}`
                  }}
                </p>
              </div>
              <div class="flex flex-col items-end justify-center">
                <p class="font-bold text-lg">
                  {{ weather.main }}
                </p>
                <p class="font-light text-sm uppercase">
                  {{ weather.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p><span>Humidity: </span>{{ forecast.main.humidity }} %</p>
        <p><span>Feels Like: </span> {{ forecast.main.feels_like }} °C</p>
        <p><span>Temp Max: </span>{{ forecast.main.temp_max }}</p>
        <p><span>Temp Min: </span>{{ forecast.main.temp_min }}</p>
        <p><span>Pressure: </span>{{ forecast.main.pressure }}</p>
        <div class="flex justify-center">
          <p class="text-2xl font-bold"><span class="text-2xl font-light">Your time:</span> {{ time }}</p>
        </div>
      </div>
      <nav-component></nav-component>
    </div>
  </div>
</template>

<script>
import fetchData from "@/index";
// @ is an alias to /src
import navComponent from "../navComponent";

export default {
  name: 'HomeView',
  components: {
    navComponent,
  },
  data: () => ({
    query: null,
    results: null,
    now: new Date()
  }),
  mounted() {
    if (this.query == null) {
      this.query = 'Bogota';
      fetchData(this.query)
          .then(r => this.results = r)
          .catch(e => console.error(e))
    } else if (this.query == "") {
      this.query = 'Bogota';
      fetchData(this.query)
          .then(r => this.results = r)
          .catch(e => console.error(e))
    }
    setInterval(() => this.getTime(), 1000)
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
      setInterval(() => {
        fetchData(this.query)
            .then(r => console.log(this.results = r))
            .catch(e => console.error(e))
      }, 1000)
    },
    getTime() {
      this.now = new Date();
    },
    formatTimeZone(timestamp) {
      const time = new Date() - new Date(timestamp)
      return new Date(time)
    }
  }
}
</script>

<style>
#city {
  outline: none;
}

.home {
  background: linear-gradient(180deg, #E75481 -22.84%, #929CDE 113.36%);
}
</style>
