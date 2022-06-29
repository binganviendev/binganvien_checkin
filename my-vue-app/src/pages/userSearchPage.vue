<template>
  <div>
    <video autoplay muted loop id="bg-video">
      <source src="@/assets/bg.webm" type="video/mp4">
    </video>
    <div class="position-absolute w-100">
      <img alt="logo" class="w-100px pt-5 app-logo" src="@/assets/logo.png" />
      <div class="pt-4 text-center">
        <el-select class="w-75" id="name-input" v-model="form.name" @blur="handle"
          placeholder="Xin mời Quý khách nhập họ và tên" @change="pushData" value-key="name" remote reserve-keyword
          :remote-method="remoteMethod" filterable>
          <el-option v-for="item in options" :key="item.id"
            :label="`${item.name} - ${moment(item.dob).format('DD/MM/YYYY')}`" :value="item" />
        </el-select>

      </div>
    </div>
    <footer class="footer-rights m-auto">@ 2016 - {{ year }} Công ty TNHH Chế tác cao cấp Bỉ Ngạn Viên - All rights
      reserved</footer>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watch } from 'vue'
import { fetchUsers } from '@/plugins/spreadsheet';
import { toLowerCaseNonAccentVietnamese } from '@/plugins/common';
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
  image: '',
})
const selectValue = ref('');

const users = reactive({
  data: []
})
const options = ref([])

const remoteMethod = (query) => {
  if (query) {
    options.value = users.data.filter((item) => {
      return toLowerCaseNonAccentVietnamese(item.name).includes(toLowerCaseNonAccentVietnamese(query))
    })
  } else {
    options.value = []
  }
}

function handleChange(user) {
  // form.id = user.id;
  // form.name = user.name;
  // form.dob = user.dob;
  // form.content = user.content;
  // form.meet_at = user.meet_at;
  // form.image = user.image;
  pushData(user);
}

async function pushData(data) {
  myChannel.trigger(event, JSON.stringify(data));
}

onBeforeMount(async () => {
  users.data = await fetchUsers();
})
</script>
<style>
* {
  --el-select-input-focus-border-color: transparent;
}

.el-input__inner {
  border-radius: 50%;
}

#name-input {
  color: #000;
  height: 40px;
  background-color: transparent;
  border-radius: 2rem;
  border: 3px solid rgb(205, 172, 114) !important;
  outline: none !important;
  padding: 0 1rem;
  color: #fff;
  animation: fadein 3s;
  -webkit-animation: fadein 3s;
  /* Safari and Chrome */
}

#name-input::placeholder {
  color: #fff;
}

.app-logo {
  animation: fadein 1.5s;
  -webkit-animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {

  /* Safari and Chrome */
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.el-input__wrapper {
  background: transparent;
  box-shadow: none !important;
  padding: 0;
  outline: none;
}

.el-select__popper {
  background-color: rgba(0, 0, 0, 0.6) !important;
  border: 3px solid rgb(205, 172, 114) !important;
  border-radius: 1rem;
  color: #fff;
}

.el-select-dropdown__item {
  color: #fff;
}

.el-select-dropdown__item.hover {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

#bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>
