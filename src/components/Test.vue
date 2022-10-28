<template>
  <div class="center">
    {{ conditions }}
    <div
      class="content"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="4"
    >
      <div
        class="box"
        v-for="i in items"
        :key="i.color + i.id"
        :style="{ backgroundColor: i.color }"
      >
        {{ i.id }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useConditionWatcher } from "vue-condition-watcher";
import infiniteScroll from "vue3-infinite-scroll-good";
import api from "@/api/index";

export default {
  directives: { infiniteScroll },
  setup() {
    const busy = ref(false);
    const items = ref([]);
    const { conditions, loading } = useConditionWatcher({
      fetcher: api.addBox,
      conditions: {
        offset: 0,
        limit: 4,
      },
      afterFetch(data) {
        if (!data) return;
        items.value = items.value.concat(data);
      },
    });
    const loadMore = () => {
      busy.value = true;
      console.log(loading.value);
      if (loading.value) return;
      conditions.offset += conditions.limit;
    };
    return { items, conditions, loading, loadMore };
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.box {
  margin: 20px;
  width: calc(100% / 3);
  height: 200px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  line-height: 200px;
}
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  font-size: 20px;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
