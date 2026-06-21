import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { uploadImage, deleteImage } from "../../utils/cloudinary";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const images: { url: string; publicId: string }[] = [];

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
    ? typeof req.body.techStack === "string"
      ? (req.body.techStack as string).split(",").map((t: string) => t.trim())
      : (req.body.techStack as any)
    : [];

  const projectData = {
    ...req.body,
    images,
    techStack,
    featured: req.body.featured === "true",
    order: Number(req.body.order) || 0,
  };

  const result = await ProjectService.createProject(projectData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects({});
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getProjectById(req.params.id);
  if (!result) {
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
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const files = req.files as Express.Multer.File[];

  const existingProject = await ProjectService.getProjectById(id);
  if (!existingProject) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Project not found",
    });
  }

  let currentImages = existingProject.images || [];

  if (body.keepImages) {
    const keepImages = JSON.parse(body.keepImages);
    const keepPublicIds = keepImages.map((img: any) => img.publicId);

    for (const img of currentImages) {
      if (img.publicId && !keepPublicIds.includes(img.publicId)) {
        await deleteImage(img.publicId);
      }
    }
    currentImages = keepImages;
  }

  if (files && files.length > 0) {
    for (const file of files) {
      const upload = await uploadImage(file.path, "portfolio/projects");
      currentImages.push({
        url: upload.url,
        publicId: upload.public_id,
      });
    }
  }

  const updateData: any = {
    ...body,
    images: currentImages,
    techStack: body.techStack
      ? typeof body.techStack === "string"
        ? (body.techStack as string).split(",").map((s: string) => s.trim())
        : (body.techStack as any)
      : undefined,
    featured:
      body.featured === "true"
        ? true
        : body.featured === "false"
          ? false
          : (body.featured as any),
    order: body.order ? Number(body.order) : undefined,
  };

  delete updateData.keepImages;

  const result = await ProjectService.updateProject(id, updateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await ProjectService.getProjectById(id);

  if (project?.images && project.images.length > 0) {
    for (const img of project.images) {
      if (img.publicId) {
        await deleteImage(img.publicId);
      }
    }
  }

  const result = await ProjectService.deleteProject(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

const getFeatured = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getFeaturedProjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Featured projects fetched successfully",
    data: result,
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
