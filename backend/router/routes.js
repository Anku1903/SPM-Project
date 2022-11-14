const express = require("express")
const { register, login, restaurents, onerestora, finditems, additems, delitems, order, findorder } = require("../controllers/controls")


const router = express.Router()

router.post("/register",register)
router.post('/login',login)
router.get("/restaurents",restaurents)

router.get("/restaurents/:id",onerestora)

router.post("/fooditems",finditems)

router.post("/additems",additems)

router.post("/delitems",delitems)

router.post("/order",order)


router.post("/findorder",findorder)




module.exports = router;