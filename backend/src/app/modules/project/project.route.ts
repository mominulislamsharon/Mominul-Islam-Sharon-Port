import express from "express";
import { ProjectController } from "./project.controller";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("images", 5), ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/featured", ProjectController.getFeatured);
router.get("/:id", ProjectController.getProjectById);
router.patch("/:id", upload.array("images", 5), ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

export default router;
