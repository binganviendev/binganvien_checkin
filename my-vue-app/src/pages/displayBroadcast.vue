<template>
  <div class="overflow-hidden w-100 h-100">
    <keep-alive v-if="isShowData.value">
      <video autoplay muted loop playsinline id="bgg-video">
        <source src="@/assets/tv_bg.mp4" type="video/mp4">
      </video>
    </keep-alive>
    <keep-alive v-else>
      <div>
        <video autoplay muted loop playsinline id="bgg-video" class="left-0">
          <source src="@/assets/free_play.mp4" type="video/mp4">
        </video>
        <QRCode class="qrcode position-absolute" />
      </div>
    </keep-alive>

    <div class="position-absolute bgg-container overflow-hidden" v-if="isShowData.value">
      <div class="row w-100 h-100 p-3">
        <div class="col-6 h-100 ">
          <img alt="logo" class="_1st w-200px mt-5 py-5 app-logo" src="@/assets/logo.png" />
          <h3 class="_1st">Họ và tên</h3>
          <h3 class="_1st text-content">{{ form.name }}</h3>

          <h3 class="_2nd">Ngày sinh</h3>
          <h3 class="_2nd text-content mb-5 pb-5">{{ moment(form.dob).format('DD/MM/YYYY') }}</h3>

          <h3 class="_3rd pt-5 mt-5">Lịch hẹn</h3>
          <h3 class="_3rd text-content">{{ moment(form.meet_at).format('DD/MM/YYYY hh:mm') }}</h3>

          <h3 class="_4th">Nội dung</h3>
          <h3 class="_4th text-content">{{ form.content }}</h3>
        </div>
        <div class="col-6 h-100 middle-align">
          <img class="_5th w-100 image-transition" :src="form.image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref, reactive } from 'vue'
import Pusher from 'pusher-js';
import QRCode from '@/assets/qr-code.svg';

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
pusher.subscribe(channel).bind(event, function (data) {
  handleChange(data);
});

// Vue application
const form = reactive({
  id: '',
  name: '',
  dob: '',
  content: '',
  meet_at: '',
  image: '',
})
const isShowData = reactive({
  value: false
});
let myInterval = setInterval(function () { isShowData.value = false }, 60*1000);

function handleChange(user) {
  form.id = user.id;
  form.name = user.name;
  form.dob = user.dob;
  form.content = user.content;
  form.meet_at = user.meet_at;
  form.image = user.image.replace('open', 'uc');
  isShowData.value = true;

  // Reset interval
  clearInterval(myInterval);
  myInterval = setInterval(function () { isShowData.value = false }, 60*1000);
}

</script>
<style>
#bgg-video {
  position: fixed;
  right: 9rem;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.bgg-container {
  padding: 0;
  margin: 0;

  left: 30%;
  height: 100%;
  width: calc(100vw - 30%);
  translate: translate(-50%);
  max-width: calc(100vw - 30rem);
}

.text-content {
  color: rgb(205, 172, 114) !important;
  font-style: italic
}

h3 {
  font-size: 3rem;
  font-weight: bold;
  position: relative;
  opacity: 0;
  animation-fill-mode: forwards !important;
}

.image-transition {
  opacity: 0;
  animation-fill-mode: forwards !important;
}


._1st {
  animation: fadein 2s;
}

._2nd {
  animation: fadein 2s;
  animation-delay: 1s;
}

._3rd {
  animation: fadein 2s;
  animation-delay: 2s;
}

._4th {
  animation: fadein 2s;
  animation-delay: 3s;
}

._5th {
  animation: fadeinImage 2s;
  animation-delay: 4s;
}


@keyframes fadein {
  from {
    opacity: 0;
    top: 500px;
  }

  to {
    opacity: 1;
    top: 0;
  }
}

@keyframes fadeinImage {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.middle-align {
  display: flex;
  align-items: center;
  justify-content: center;
}

.w-200px {
  width: 150px;
}

.left-0 {
  left: 0 !important;
}

.qrcode {
  margin: auto;
  width: 300px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
