<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElScrollbar } from 'element-plus';
import { useConditionWatcher } from 'vue-condition-watcher';
import api from '../api/index';

const router = useRouter();
const payload = ref('');

const cancelTrigger = ref(false);
// const results = [{
//             "gender": "male",
//             "name": {
//                 "title": "Mr",
//                 "first": "Hunter",
//                 "last": "Beck"
//             },
//             "location": {
//                 "street": {
//                     "number": 3160,
//                     "name": "Church Lane"
//                 },
//                 "city": "Derby",
//                 "state": "Berkshire",
//                 "country": "United Kingdom",
//                 "postcode": "NF39 8XG",
//                 "coordinates": {
//                     "latitude": "-7.1806",
//                     "longitude": "-29.2581"
//                 },
//                 "timezone": {
//                     "offset": "+4:00",
//                     "description": "Abu Dhabi, Muscat, Baku, Tbilisi"
//                 }
//             },
//             "email": "hunter.beck@example.com",
//             "login": {
//                 "uuid": "095140c5-1e9a-4e95-8c50-fc7596d44895",
//                 "username": "silverfrog135",
//                 "password": "lancia",
//                 "salt": "te6JP6Kv",
//                 "md5": "551bb1d04b21a7eebcab11e3fc74660c",
//                 "sha1": "56ce6da7e2a7babff7568e4af244d023051ce886",
//                 "sha256": "a1e820f639a8161ae12547f6f1a0669d4c6b2805e78fb94439a844c923bf5e11"
//             },
//             "dob": {
//                 "date": "1999-08-30T08:39:36.067Z",
//                 "age": 23
//             },
//             "registered": {
//                 "date": "2017-08-03T14:22:42.548Z",
//                 "age": 5
//             },
//             "phone": "015242 58126",
//             "cell": "07821 284980",
//             "id": {
//                 "name": "NINO",
//                 "value": "ZH 10 47 02 T"
//             },
//             "picture": {
//                 "large": "https://randomuser.me/api/portraits/men/49.jpg",
//                 "medium": "https://randomuser.me/api/portraits/med/men/49.jpg",
//                 "thumbnail": "https://randomuser.me/api/portraits/thumb/men/49.jpg"
//             },
//             "nat": "GB"
//         }
//     ];

const {
  conditions,
  isFetching,
  data,
  onConditionsChange,
  onFetchSuccess,
  onFetchError,
} = useConditionWatcher({
  fetcher: (params) => {
    payload.value = JSON.stringify(params);
    return api.users(params);
  },
  conditions: {
    gender: ['male'],
    page: 1,
  },
  defaultParams: {
    results: 100,
  },
  initialData: [],
//   cacheProvider: inject('cacheProvider'),
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
    if (data) {
       return data.results;
    }
    return;
}

onConditionsChange((newCond, oldCond) => {
  if (newCond.page !== 1 && newCond.page === oldCond.page) {
    cancelTrigger.value = true;
    conditions.page = 1;
  }
});

onFetchSuccess((res) => {
  console.log('onFetchSuccess=', res);
});

onFetchError((error) => {
  console.log('onFetchError=', error);
});
</script>

<template>
  <el-scrollbar ref="scrollbarRef">
    <el-table :data="data" style="width: 100%" v-loading="isFetching">
      <el-table-column label="Index" v-slot="{ $index }">
        {{ $index + 1 }}
      </el-table-column>
      <el-table-column label="Photo" v-slot="{ row }">
        <el-image :src="row.picture.thumbnail" />
      </el-table-column>
      <el-table-column label="Name" v-slot="{ row }">
        {{ `${row.name.first} ${row.name.last}` }}
      </el-table-column>
      <el-table-column prop="gender" label="Gender" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="phone" label="Phone" />
    </el-table>
  </el-scrollbar>
  <div class="footer">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="10"
      v-model:current-page="conditions.page"
    />
  </div>
</template>
