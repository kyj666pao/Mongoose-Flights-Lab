import { Router } from 'express'
import { Flight } from "../models/flight.js" 

const router = Router()

// GET localhost:3000/users
router.get('/', function(req, res) {
    Flight.find({})
    .then(flights => {
        console.log(flights)
        res.render("flights/index", { flights })
    })
    .catch(err => {
        console.log(err)
        res.send("/flights Error!")
    })
})

router.get("/new", (req,res)=> {
    res.render("flights/new")
})

router.post("/", (req,res) => {
    console.log(req.body)
    Flight.create(req.body)
    .then(flight => {
        res.redirect("/flights")
    })
    .catch(err => {
        console.log(err)
        res.redirect("/flights")
    })
})



export { router }