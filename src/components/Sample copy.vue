<template>
  <div>
    <div class="filter">
      <input v-model="conditions.gender" />
      <button @click="execute">Refetch</button>
      <!-- <button @click="reset">Reset</button> -->
    </div>
    <div class="container">
      <!-- {{ !loading ? data : "Loading..." }} -->
      {{ data }}
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";
// import { useRouter } from "vue-router";
import { useConditionWatcher } from "vue-condition-watcher";
export default {
  setup() {
    const fetcher = (params) =>
      axios.get("https://randomuser.me/api/", { params });
    // const router = useRouter();

    // resetConditions({
    //     gender: null,
    // })

    const { conditions, data, loading, execute, error } = useConditionWatcher({
      fetcher,
      conditions: {
        gender: null,
        // gender: ["male"],
        // page: 1,
      },
      defaultParams: {
        results: 1,
      },
      initialData: [], // [ set initial state ]
      immediate: false, // [ initial state not fetch data ]
      manual: true, // [ automatically fetch data is not working (wanted click event work) ]
      //   history: {
      //     sync: router,
      //   },
    });

    // const reset = () => {
    //     resetConditions();
    // }
    return { conditions, data, loading, execute, error };
  },
};
</script>