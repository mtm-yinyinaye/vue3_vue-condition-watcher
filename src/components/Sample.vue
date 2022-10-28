<template>
  <div class="container my-5">
    <div class="filter">
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
import axios from "axios";
import { useConditionWatcher } from "vue-condition-watcher";
export default {
  setup() {
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
        initialData: [],
        immediate: true,
        manual: false,
        afterFetch(response) {
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
    return { conditions, data, loading, execute, error, isFetching, options };
  },
};
</script>