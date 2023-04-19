import { Router } from "express";

import * as mealsCtrl from "../controllers/meals.js";

const router = Router();

// get "/new"     --------mealCtrl.index
router.get("/new", mealsCtrl.index);

// post "/"      ----createMeal----mealCtrl.create
router.post("/", mealsCtrl.create);

export { router };
