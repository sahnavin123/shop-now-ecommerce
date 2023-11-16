import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    var bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET);
    var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          "jwtsecret",
          {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION_DATE,
          }
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(400).json({ success: false, error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ success: false, error: "no user found" });
    }
  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }
};

export default connectDb(handler);
