<template>
  <div class="p-3">

    <div class="text-start">
      <label class="float-left">Lựa chọn khách hàng</label>
      <!-- {{ users.data }} -->
      <el-select v-model="selectValue" placeholder="Select" class="w-100 mb-4" @change="handleChange" value-key="name"
        clearable filterable>
        <el-option v-for="item in users.data" :key="item.id"
          :label="`${item.name} - ${moment(item.dob).format('DD/MM/YYYY')}`" :value="item" />
      </el-select>
    </div>

    <el-form :model="form" label-width="120px" label-position="left" disabled=true>
      <el-form-item label="Họ và tên">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="Ngày Sinh">
        <el-date-picker v-model="form.dob" type="date" placeholder="Pick a date" style="width: 100%"
          format="DD/MM/YYYY" />
      </el-form-item>

      <el-form-item label="Thời điểm hẹn">
        <el-date-picker v-model="form.meet_at" type="datetime" placeholder="Pick a date" style="width: 100%"
          format="DD/MM/YYYY hh:mm:ss" />
      </el-form-item>

      <el-form-item label="Activity form">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { fetchUsers } from '@/plugins/spreadsheet';
import moment from "moment";
import Pusher from 'pusher-js';

Pusher.logToConsole = true;
const pusherKey = 'ded5041fb98b0734a8cf';
const channel = 'private-binganvien';
const event = 'client-broadcast';

var pusher = new Pusher(pusherKey, {
  cluster: 'ap1',
  channelAuthorization: {
    endpoint: "api/pusher-auth",
  }
});
const myChannel = pusher.subscribe(channel);

// do not use same name with ref
const form = reactive({
  id: '',
  name: '',
  dob: '',
  content: '',
  meet_at: '',
})
const selectValue = ref('');

const users = reactive({
  data: []
})

function handleChange(user) {
  form.id = user.id;
  form.name = user.name;
  form.dob = user.dob;
  form.content = user.content;
  form.meet_at = user.meet_at;
  pushData(form);
}

async function pushData(data) {
  myChannel.trigger(event, JSON.stringify(data));
  // const res = await fetch('/api/channels-event', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) {
  //   console.error('failed to push data');
  // }
}

onBeforeMount(async () => {
  users.data = await fetchUsers();
})
</script>
