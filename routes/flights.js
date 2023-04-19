import { Router } from "express";

import * as flightsCtrl from "../controllers/flights.js";

const router = Router();

// GET localhost:3000/users ------flightsCtrl.index
router.get("/", flightsCtrl.index);
// router.get("/", async (req, res) => {
//   try {
//     let flights = await Flight.find();
//     flights.sort((a, b) => {
//       return b.departs
//         .toISOString()
//         .slice(0, 16)
//         .localeCompare(a.departs.toISOString().slice(0, 16));
//     });
//     res.render("flights/index", {
//       flights,
//       title: "All Flight",
//     });
//   } catch {
//     res.send("Error with finding data");
//   }
// });

//  -------flightsCtrl.new
router.get("/new", flightsCtrl.new);

//  -------flightsCtrl.show
router.get("/:flightId", flightsCtrl.show);

//  -------flightsCtrl.edit
router.get("/:flightId/edit", flightsCtrl.edit);

//  -------flightsCtrl.create
router.post("/", flightsCtrl.create);

// -------flightsCtrl.createTicket
router.post("/:flightId/tickets", flightsCtrl.createTicket);

//  -------flights.addToMeal
router.post("/:flightId/meals", flightsCtrl.addToMeal);

//  -------flightsCtrl.delete
router.delete("/:flightId", flightsCtrl.delete);

//  -------flightsCtrl.update
router.put("/:flightId", flightsCtrl.update);

export { router };
