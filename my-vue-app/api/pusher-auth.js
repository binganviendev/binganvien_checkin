
module.exports = (req, res) => {
  // res.status(200).end({ "auth": "random_token", "user_info": "my_user_info" });
  res.json({ auth: "$2a$14$dKlTzyT/GtxOO9m.fIDOEeuoGDgZ29y9FNjeX9VCT329UpKmqQlEO", user_info: "my_user_info" })
}
