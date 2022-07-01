<template>
  <div>
    <video id="bg-video" autoplay loop muted playsinline>
      <source src="@/assets/video.mp4" type="video/mp4">
    </video>
    <div class="position-absolute w-100">
      <img alt="logo" class="_1st w-100px pt-4 app-logo" src="@/assets/logo.png" />
      <div class="pt-2 text-center position-relative ">
        <input type="text" name="city" :value="inputValue" @input="remoteMethod" id="name-input" class="_2nd w-75"
          :placeholder="placeholder" />

        <div class="fill-ele" v-if="options.length">&nbsp;</div>
        <div class="dropdown" v-if="options.length">
          <div
            @click="pushData(item)"
            class="row-user"
            v-for="item in options"
            :key="item.id"
          >
            {{ item.name }} - {{ moment(item.dob).format('DD/MM/YYYY') }}
          </div>
        </div>

        <!-- <el-select class="w-75" id="name-input" v-model="form.name" @blur="handle" -->
        <!--   placeholder="Xin mời Quý khách nhập họ và tên" @change="pushData" value-key="name" remote reserve-keyword -->
        <!--   :remote-method="remoteMethod" filterable> -->
        <!--   <el-option v-for="item in options" :key="item.id" -->
        <!--     :label="`${item.name} - ${moment(item.dob).format('DD/MM/YYYY')}`" :value="item" /> -->
        <!-- </el-select> -->

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
const placeholder = ref("Xin mời Quý khách nhập họ và tên"); const users = reactive({
  data: []
})
const options = ref([])
const inputValue = ref("")

const remoteMethod = (e) => {
  let query = e.target.value;
  inputValue.value = query;

  if (query) {
    options.value = users.data.filter((item) => {
      return toLowerCaseNonAccentVietnamese(item.name).includes(toLowerCaseNonAccentVietnamese(query))
    })
  } else {
    options.value = []
  }
}

async function pushData(data) {
  inputValue.value = "";
  options.value = []
  placeholder.value = `${data.name} -  ${ moment(data.dob).format('DD/MM/YYYY') }`;
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
  z-index: 3;
  position: relative;
  opacity: 0;
  animation-fill-mode: forwards !important;
}

#name-input::placeholder {
  color: #fff;
}

.app-logo {
  opacity: 0;
  animation-fill-mode: forwards !important;
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
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.dropdown {
  position: absolute;
  left: 0;
  margin: auto;
  left: 0;
  right: 0;
  color: #fff;
  width: 75%;
  top: 45px;
  z-index: 0;
  border: 3px solid rgb(205, 172, 114);
  border-top: none;
  border-radius: 0 0 1rem 1rem;
  max-height: 30vh;
  overflow-y: scroll;
}

.dropdown .row-user {
  background: rgba(0, 0, 0, 0.4);
}

.dropdown .row-user:hover {
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.dropdown .row-user:last-of-type {
  border-radius: 0 0 1rem 1rem;
}

._1st {
  animation: fadein 2s;
}

._2nd {
  animation: fadein 2s;
  animation-delay: 1s;
}
.fill-ele {
  position: absolute;
  width: 75%;
  margin: auto;
  left: 0;
  right: 0;
  top: 30px;
  border: 3px solid rgb(205, 172, 114);
  border-top: none;
  border-bottom: none;
}
</style>
