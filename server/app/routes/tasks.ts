import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import { createTask, deleteTask, getTasks, updateTask } from "../queries/task";

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks(req.user!.id);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

const validStatus = ["BACKLOG", "TODO", "IN_PROGRESS", "COMPLETE"];

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, status, description } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).send("Task Name is required");
    }

    // Validate Status
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Valid Statuses: 'BACKLOG', 'TODO', 'IN_PROGRESS', 'COMPLETE'",
      });
    }

    // Create new task
    const newTask = await createTask({
      name,
      status,
      description,
      userId: req.user!.id,
    });

    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate input
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("No update data provided");
    }

    // Validate status is correct
    const { status } = req.body;

    if (status && !validStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    // Update task
    const updatedTask = await updateTask(id, req.body);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete task
    const deletedTask = await deleteTask(id);

    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }

    res.send("Task deleted successfully");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
export default router;
