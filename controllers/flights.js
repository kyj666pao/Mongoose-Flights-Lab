import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

// GET localhost:3000/flights
const index = (req, res) => {
  Flight.find({})
    .then((flights) => {
      flights.sort((a, b) => {
        return b.departs
          .toISOString()
          .slice(0, 16)
          .localeCompare(a.departs.toISOString().slice(0, 16));
      });
      res.render("flights/index", {
        flights,
        title: "All Flight",
      });
    })
    .catch((err) => {
      console.log(err);
      //   res.send("/flights Error!");
      res.redirect("/flights");
    });
};

// GET localhost:3000/flights/new
const newFlight = (req, res) => {
  // let date = new Date()
  // date = `${date.getFullYear()+1}-${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1 }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate() }T${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const date = JSON.stringify(dt).slice(1, 17);
  res.render("flights/new", {
    title: "Add Flight",
    date,
  });
};

// POST localhost:3000/flights
const create = (req, res) => {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  Flight.create(req.body)
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      //   res.send("Failed to create the flight");
      res.redirect("/flights");
    });
};

// GET localhost:3000/flights/:flightId
const show = (req, res) => {
  let { flightId } = req.params;
  Flight.findById(flightId)
    .populate("meal")
    .then((flight) => {
      Meal.find({ _id: { $nin: flight.meal } })
        .then((meals) => {
          res.render("flights/show", {
            flight,
            title: "Flight Detail",
            meals,
          });
        })
        .catch((err) => {
          console.log(err);
          //   res.send("Meal info is not found");
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
};

// DELETE localhost:3000/flights/:flightId
const deleteFlight = (req, res) => {
  let { flightId } = req.params;
  Flight.findByIdAndDelete(flightId)
    .then((flight) => {
      res.redirect("/flights");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
};

// GET localhost:3000/flights/:flightId/edit
const edit = (req, res) => {
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
      //   res.send("ERROR");
      res.redirect("/flights");
    });
};

// PUT localhost:3000/flights/:flightId
const update = (req, res) => {
  let { flightId } = req.params;
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  Flight.findByIdAndUpdate(flightId, req.body, { new: true })
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      //   res.send("Error when update");
      res.redirect("/flights");
    });
};

// POST localhost:3000/flights/tickets
const createTicket = (req, res) => {
  let { flightId } = req.params;
  Flight.findById(flightId)
    .then((flight) => {
      flight.tickets.push(req.body);
      flight
        .save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
        .catch((err) => {
          console.log(err);
          //   res.send("Failed to create ticket");
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      //   res.send("Flight is not Found");
      res.redirect("/flights");
    });
};

//  POST localhost:3000/flights/meals
const addToMeal = (req, res) => {
  let { flightId } = req.params;
  let { mealId } = req.body;

  Flight.findById(flightId)
    .then((flight) => {
      flight.meal.push(req.body.mealId);
      flight
        .save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
        .catch((err) => {
          console.log(err);
          //   res.send("Failed to add meal to flight");
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      //   res.send("Flight info is not found");
      res.redirect("/flights");
    });
};

export {
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal,
};
