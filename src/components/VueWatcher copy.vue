<template>
  <div class="center">Data - {{ data }}</div>
</template>

<script>
import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
// import { ElScrollbar } from "element-plus";
import { useConditionWatcher } from "vue-condition-watcher";
import api from "@/api/index";

export default {
  setup() {
    const router = useRouter();
    const payload = ref("");
    const fetchCounts = ref(0);
    // const scrollbarRef = ref();
    const cancelTrigger = ref(false);
    const pollingInterval = ref(0);

    const {
      conditions,
      isFetching,
      data,
      // mutate,
      // execute,
      // resetConditions,
      onFetchFinally,
      // onConditionsChange,
      onFetchSuccess,
      onFetchError,
    } = useConditionWatcher({
      fetcher: (params) => {
        payload.value = JSON.stringify(params);
        console.log(params);
        return api.users(params);
      },
      conditions: {
        gender: ["male"],
        page: 1,
      },
      defaultParams: {
        results: 10,
      },
      manual: false,
      immediate: true,
      pollingInterval: pollingInterval,
      pollingWhenHidden: false,
      pollingWhenOffline: false,
      revalidateOnFocus: true,
      initialData: [],
      //   cacheProvider: inject("cacheProvider"),
      history: {
        sync: router,
      },
      beforeFetch,
      afterFetch,
    });

    function beforeFetch(cond, cancel) {
      if (cancelTrigger.value) {
        cancel();
        cancelTrigger.value = false;
      }
      return cond;
    }

    function afterFetch(data) {
      return data.results;
    }

    onFetchSuccess((res) => {
      console.log("onFetchSuccess=", res);
    });

    onFetchError((error) => {
      console.log("onFetchError=", error);
    });

    onFetchFinally(async () => {
      fetchCounts.value += 1;
      await nextTick();
    //   scrollbarRef.value.setScrollTop(0);
    });

    return {
      conditions,
      isFetching,
      data,
      // mutate,
      // execute,
      // resetConditions,
      onFetchFinally,
      // onConditionsChange,
      onFetchSuccess,
      onFetchError,
    };
  },
};
</script>

<style scoped>
</style>
