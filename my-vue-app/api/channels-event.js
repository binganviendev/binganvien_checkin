const Channels = require('pusher');

const {
  APP_ID: appId,
  KEY: key,
  SECRET: secret,
  CLUSTER: cluster,
} = process.env;

const channels = new Channels({
  appId,
  key,
  secret,
  cluster,
});

module.exports = (req, res) => {
  const data = req.body;

  res.status(200).end('sent event successfully');
  const channel = 'binganvien';
  const event = 'broadcast';
  channels.trigger(channel, event, data, () => {
    res.status(200).end('sent event successfully');
  });
};
