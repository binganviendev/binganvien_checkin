const Pusher = require('pusher');

const appId = "1428573";
const key = "ded5041fb98b0734a8cf";
const secret = "98faa35b224a20255be3";
const cluster = "ap1";

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

module.exports = (req, res) => {
  const data = req.body;

  const channel = 'binganvien';
  const event = 'broadcast';
  pusher.trigger(channel, event, data, () => {
    res.status(200).end('sent event successfully');
  });
};
