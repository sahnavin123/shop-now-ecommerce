import User from "@/models/User";
import connectDb from "@/middleware/mongoose";


var CryptoJs = require('crypto-js');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        // console.log(req.body)
        const { name, email } = req.body
        let u = new User({ name, email, password: CryptoJs.AES.encrypt(req.body.password, 'secret123').toString() })
        await u.save()
        res.status(200).json({ success: "success" })

    } else {
        res.status(400).json({ error: "this method is not allowed" })
    }

}

export default connectDb(handler)