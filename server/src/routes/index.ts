import express from "express";
import taskRoute from "./task.route";

const router = express.Router();

router.get("/v1", (_, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

router.use("/tasks", taskRoute);

export default router;
