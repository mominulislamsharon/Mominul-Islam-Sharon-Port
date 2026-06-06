import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { deleteImage, uploadImage } from "../../utils/clodinary";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const images: { url: string; publicId: string }[] = [];

  // Upload images if files exist
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const upload = await uploadImage(file.path, "portfolio/projects");
      images.push({
        url: upload.url,
        publicId: upload.public_id,
      });
    }
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
    images,
    techStack,
  });
  console.log("Project created:", project);

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
  const newImages: { url: string; publicId: string }[] = [];

  // Upload new images if files exist
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const upload = await uploadImage(file.path, "portfolio/projects");
      newImages.push({
        url: upload.url,
        publicId: upload.public_id,
      });
    }
  }

  const techStack = req.body.techStack
    ? Array.isArray(req.body.techStack)
      ? req.body.techStack.map((t: string) => t.trim())
      : String(req.body.techStack)
          .split(",")
          .map((t: string) => t.trim())
    : [];

  const existingProject = await ProjectService.getProjectById(String(req.params.id));
  const images = [...(existingProject?.images || []), ...newImages];

  const update = { ...req.body, images, ...(techStack.length > 0 && { techStack }) };
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
  const project = await ProjectService.getProjectById(String(req.params.id));
  if (!project)
    return res.status(404).json({ success: false, message: "Not found" });

  if (project.images && project.images.length > 0) {
    for (const img of project.images) {
      await deleteImage(img.publicId);
    }
  }
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
