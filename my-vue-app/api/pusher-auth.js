
module.exports = (req, res) => {
  res.status(200).end({ "auth": "random_token", "user_info": "my_user_info" });
}
