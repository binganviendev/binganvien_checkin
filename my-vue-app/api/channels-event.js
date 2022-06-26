var Pusher = require("pusher");

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
