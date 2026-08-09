import express from "express";
const router = express.Router();

import TaskCtrl from "../controllers/task.controller";

router.post("/", TaskCtrl.create);
router.get("/", TaskCtrl.findAll);
router.get("/:id", TaskCtrl.findById);
router.put("/:id", TaskCtrl.update);
router.patch("/:id/toggle", TaskCtrl.toggleComplete);
router.delete("/:id", TaskCtrl.delete);

export default router;