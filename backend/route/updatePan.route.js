const express = require("express")
const { UpdatePanModel } = require("../model/updatePan/updatePan.model")
const { auth } = require("../middleware/auth.middleware")
const updatePanRoute = express.Router()


updatePanRoute.use(auth)
updatePanRoute.post("/pan-update", async (req, res) => {
    try {
        const pans = new UpdatePanModel(req.body)
        await pans.save()
        res.send("You are send request for update pancard successfully.")

    } catch (error) {
        res.send(error)
    }
})

//patch
updatePanRoute.patch("/pan-update/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await UpdatePanModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send("Save successfully.")

    } catch (error) {
        res.send(error)
    }
})

//get perticular id data

updatePanRoute.get('/pan-update-single/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pan = await UpdatePanModel.findOne({ _id: id })
        res.send(pan)

    } catch (error) {
        res.send(error)
    }
})



module.exports = {
    updatePanRoute
}