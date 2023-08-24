const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token, 'vdp');
            if (decoded) {
                req.body.username = decoded.username
                req.body.userID = decoded.userID
                req.body.vendorID = decoded.vendorID

                next()
            }


        } catch (error) {
            res.send(error.message)
        }
    }
    else {
        res.status(500).send("Please Login!")
    }

}
module.exports = { auth }