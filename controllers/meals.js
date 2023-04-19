import { Router } from "express";
import { Meal } from "../models/meal.js";

// GET localhost:3000/meals/new
const index = (req, res) => {
  Meal.find()
    .then((meals) => {
      res.render("meals/new", {
        title: "Add Meal",
        meals,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("Meal info is not found");
    });
};

// POST localhost:3000/meals
const create = (req, res) => {
  console.log(req.body);
  Meal.create(req.body)
    .then((meal) => {
      console.log(meal);
      res.redirect("/meals/new");
    })
    .catch((err) => {
      console.log(err);
      res.send("Failed to create meal");
    });
};

export { 
    index, 
    create, 
};
