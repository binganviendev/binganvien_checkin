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

console.log('in');
module.exports = (req, res) => {
  console.log(1);
  const channel = 'binganvien';
  console.log(2);
  const event = 'broadcast';
  console.log(3);
  pusher.trigger(channel, event, { message: JSON.stringify(req.body) });
  console.log(4);
  res.status(200).end('sent event successfully');
  console.log(5);
}
console.log('out');
