import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { deleteImage, uploadImage } from "../../utils/clodinary";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  let imageData = {};

  // Upload image if file exists
  if (req.file) {
    const upload = await uploadImage(req.file.path, "portfolio/projects");
    imageData = {
      image: upload.url,
      imagePublicId: upload.public_id,
    };
  }

  const techStack = req.body.techStack
    ? Array.isArray(req.body.techStack)
      ? req.body.techStack.map((t: string) => t.trim())
      : String(req.body.techStack)
          .split(",")
          .map((t: string) => t.trim())
    : [];

  const project = await ProjectService.createProject({
    ...req.body,
    ...imageData,
    techStack,
  });
  console.log('Project created:', project);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectService.getAllProjects({});
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.getProjectById(String(req.params.id));
  if (!project) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Project not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  let imageData = {};

  // Upload new image if file exists
  if (req.file) {
    const upload = await uploadImage(req.file.path, "portfolio/projects");
    imageData = {
      image: upload.url,
      imagePublicId: upload.public_id,
    };
  }

  const techStack = req.body.techStack
    ? Array.isArray(req.body.techStack)
      ? req.body.techStack.map((t: string) => t.trim())
      : String(req.body.techStack)
          .split(",")
          .map((t: string) => t.trim())
    : [];
  const update = { ...req.body, ...imageData, ...(techStack && { techStack }) };
  const project = await ProjectService.updateProject(
    String(req.params.id),
    update,
  );
  if (!project)
    return res.status(404).json({ success: false, message: "Not found" });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.deleteProject(String(req.params.id));
  if (!project)
    return res.status(404).json({ success: false, message: "Not found" });

  if (project.imagePublicId) await deleteImage(project.imagePublicId);
  await ProjectService.deleteProject(String(req.params.id));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: project,
  });
});

const getFeatured = catchAsync(async (_req: Request, res: Response) => {
  const projects = await ProjectService.getFeaturedProjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Featured projects fetched successfully",
    data: projects,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getFeatured,
};
