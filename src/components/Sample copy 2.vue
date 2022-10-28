<template>
  <div class="container my-5">
    <div class="filter">
      <!-- <input v-model="conditions.gender" />
      <b-button  @click="execute" variant="primary">Refetch</b-button> -->
      <!-- <b-form-group>
        <b-form-radio
          v-model="conditions.gender"
          value="male"
          >Male</b-form-radio
        >
        <b-form-radio
          v-model="conditions.gender"
          value="female"
          >Female</b-form-radio
        >
      </b-form-group> -->
      <b-form-radio-group
        v-model="conditions.gender"
        :options="options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
      ></b-form-radio-group>
    </div>
    <div>
      <b-overlay :show="isFetching" rounded="sm">
        <table class="table b-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, index) in data" :key="index">
              <td>{{ index + 1 }}</td>
              <td><b-img :src="v.picture.thumbnail"></b-img></td>
              <td>{{ `${v.name.first} ${v.name.last}` }}</td>
              <td>{{ v.gender }}</td>
              <td>{{ v.email }}</td>
              <td>{{ v.phone }}</td>
            </tr>
          </tbody>
        </table>
      </b-overlay>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      v-model:current-page="conditions.page"
    />
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
// import { configureCompat } from 'vue'
import axios from "axios";
import { useConditionWatcher } from "vue-condition-watcher";
export default {
  setup() {
    // configureCompat({

    // })
    // const fields = ["Index", "Photo", "Name", "Gender", "Email", "Phone"];
    const options = [
      { item: "male", name: "Male" },
      { item: "female", name: "Female" },
    ];
    const fetcher = (params) =>
      axios.get("https://randomuser.me/api/", { params });

    const { conditions, data, loading, execute, error, isFetching } =
      useConditionWatcher({
        fetcher,
        conditions: {
          gender: ["male"],
          page: 1
        },
        defaultParams: {
          results: 5,
        },
        initialData: [], // [ set initial state ]
        // cacheProvider: inject("cacheProvider"), // ma htae lae ya
        cacheProvider: localStorageProvider, // ma htae lae ya
        immediate: true, // [ initial state not fetch data = false ]
        manual: false, // [ automatically fetch data is not working (wanted click event work = true) ]
        //   history: { // route mhr param par pya chin yin
        //     sync: router,
        //   },
        afterFetch(response) {
          // other api par htet call chin yin use loh ya
          console.log(response);
          if (response.data === null) {
            return [];
          }

          return response.data.results;
        },
        onFetchError({ error }) {
          if (error.code == 401) {
            console.log("auth error");
          }
          return {
            data: [],
            error: "Error Message",
          };
        },
      });

    function localStorageProvider() {
      const map = new Map(
        JSON.parse(localStorage.getItem("your-cache-key") || "[]")
      );
      window.addEventListener("beforeunload", () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem("your-cache-key", appCache);
      });
      return map;
    }

    // // use on pagination component
    // const currentPage = computed({
    //   get: () => conditions.offset / conditions.limit + 1,
    //   set: (page) => {
    //     conditions.offset = (page - 1) * conditions.limit;
    //   },
    // });

    return { conditions, data, loading, execute, error, isFetching, options };
  },
};
</script>