const express = require("express")
const PinController = require("../controllers/PinController")

const router = express.Router()

router.get("/pin/pin-detail/:pinId", PinController.getPin)

router.put("/save-pin", PinController.SavePin)

router.put("/favorite-pin", PinController.FavoritePin)

router.put("/delete-save-pin", PinController.DeleteSavePin)

router.put("/delete-favorite-pin", PinController.DeleteFavoritePin)

router.post("/create-pin", PinController.CreatePin)

router.delete("/pin-delete/:pinId", PinController.deletePin)

router.get("/pins", PinController.getAllPins)
module.exports = router
