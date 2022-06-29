<template>
  <div class="overflow-hidden w-100 h-100">
    <video autoplay muted loop id="bgg-video">
      <source src="@/assets/tv_bg.mp4" type="video/mp4">
    </video>

    <div class="position-absolute bgg-container">
      <div class="row w-100 h-100 p-3">
        <div class="col-6 h-100 pt-5">
          <img alt="logo" class="w-200px mt-5 py-5 app-logo" src="@/assets/logo.png" />
          <h3>Họ và tên</h3>
          <h3 class="text-content">{{ form.name }}</h3>

          <h3>Ngày sinh</h3>
          <h3 class="text-content"></h3>
          <h3 class="text-content mb-5 pb-5">{{ moment(form.dob).format('DD/MM/YYYY') }}</h3>

          <h3 class="pt-5 mt-5">Lịch hẹn</h3>
          <h3 class="text-content">{{ moment(form.meet_at).format('DD/MM/YYYY hh:mm') }}</h3>

          <h3>Nội dung</h3>
          <h3 class="text-content">{{ form.content }}</h3>
        </div>
        <div class="col-6 h-100 middle-align">
          <img class="w-100" :src="form.image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref, reactive } from 'vue'
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

function handleChange(user) {
  console.log('user', user)
  form.id = user.id;
  form.name = user.name;
  form.dob = user.dob;
  form.content = user.content;
  form.meet_at = user.meet_at;
  form.image = user.image.replace('open', 'uc');
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
  font-size: 6rem;
  font-weight: bold;
}

.middle-align {
  display: flex;
  align-items: center;
  justify-content: center;
}

.w-200px {
  width: 150px;
}
</style>
