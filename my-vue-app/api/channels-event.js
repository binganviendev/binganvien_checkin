const Pusher = require('pusher');

const appId = "1428573";
const key = "ded5041fb98b0734a8cf";
const secret = "98faa35b224a20255be3";
const cluster = "ap1";

var pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

module.exports = (req, res) => {
  const channel = 'binganvien';
  const event = 'broadcast';
  pusher.trigger(channel, event, { message: "hello world" });
}