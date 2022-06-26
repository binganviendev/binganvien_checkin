<template>
  <div class="container p-3">
    <h2 class="mt-5">Thông tin tra cứu</h2>
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

      <el-form-item label="Nội dung">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>

    </el-form>
    <h2 class="mt-5">Lịch sử tra cứu</h2>
    <el-table :data="tableData.data" border style="width: 100%">
      <el-table-column prop="name" label="Tên" width="180" />
      <el-table-column prop="dob" label="Ngày sinh" width="180" />
      <el-table-column prop="meet_at" label="Giờ hẹn" />
      <el-table-column prop="trigger_at" label="Thời điểm tra cứu" />
    </el-table>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref, reactive } from 'vue'
import Pusher from 'pusher-js';

Pusher.logToConsole = true;
const pusherKey = 'ded5041fb98b0734a8cf';
const channel = 'binganvien';
const event = 'broadcast';

var pusher = new Pusher(pusherKey, { cluster: 'ap1' });
pusher.subscribe(channel).bind(event, function (data) {
  handleChange(JSON.parse(data));
});

// Vue application

const form = reactive({
  id: '',
  name: '',
  dob: '',
  content: '',
  meet_at: '',
})

function handleChange(user) {
  form.id = user.id;
  form.name = user.name;
  form.dob = user.dob;
  form.content = user.content;
  form.meet_at = user.meet_at;
  tableData.data.push({
    ...form,
    trigger_at: moment()
  })
}

const tableData = reactive({
  data: []
})
</script>
