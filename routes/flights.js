import { Router } from "express";
import { Flight } from "../models/flight.js";

const router = Router();

// GET localhost:3000/users
// router.get("/", function (req, res) {
//   Flight.find({})
//     .then((flights) => {
//       console.log(flights);
//       res.render("flights/index", {
//         flights,
//         title: "All Flight",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send("/flights Error!");
//     });

// });

router.get("/", async (req, res) => {
  let currentTime = new Date();
  let ct = currentTime.toISOString().slice(0, 16);
  console.log(ct);
  let flights = await Flight.find();
  flights.sort((a, b) => {
    return b.departs
      .toISOString()
      .slice(0, 16)
      .localeCompare(a.departs.toISOString().slice(0, 16));
  });
  // res.send(flights)
  res.render("flights/index", {
    flights,
    title: "All Flight",
    ct,
  });
});

router.get("/new", (req, res) => {
  // let date = new Date()
  // date = `${date.getFullYear()+1}-${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1 }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate() }T${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const date = JSON.stringify(dt).slice(1, 17);
  console.log(date);
  res.render("flights/new", {
    title: "Add Flight",
    date,
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Flight.create(req.body)
    .then((flight) => {
      res.redirect("/flights");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
});

router.get("/:flightId", (req, res) => {
  let { flightId } = req.params;
  Flight.findById(flightId)
    .then((flight) => {
      res.render("flights/show", {
        flight,
        title: "Flight Detail",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
});

router.delete("/:flightId", (req, res) => {
  let { flightId } = req.params;
  Flight.findByIdAndDelete(flightId)
    .then((flight) => {
      res.redirect("/flights");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
});

router.get("/edit/:flightId", (req, res) => {
  const airlineOption = ["American", "Southwest", "United"];
  const airportOption = ["AUS", "DFW", "DEN", "LAX", "SAN"];
  let { flightId } = req.params;
  Flight.findById(flightId)
    .then((flight) => {
      let date = JSON.stringify(flight.departs).replace('"', "").split(".");
      // console.log(date)
      // res.send(date)
      res.render("flights/edit", {
        flight,
        title: "Edit Flight",
        airlineOption,
        airportOption,
        date: date[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("ERROR");
      // res.redirect("/flights");
    });
});

router.put("/:flightId", (req, res) => {
  let { flightId } = req.params;
  Flight.findByIdAndUpdate(flightId, req.body, { new: true })
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error when update");
    });
});

export { router };
