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
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: "Task Name is required" });
    }

    // Create new task
    const newTask = await createTask({
      name,
      status,
      userId: req.user!.id,
    });

    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    // Validate input
    if (!name && !status) {
      return res
        .status(400)
        .json({ message: "Name or status is required for update" });
    }

    // Update task
    const updatedTask = await updateTask(id, {
      name,
      status,
    });

    if (!updatedTask) {
      return res
        .status(404)
        .json({
          message: "Task not found",
        });
    }

    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete task
    const deletedTask = await deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
})
export default router