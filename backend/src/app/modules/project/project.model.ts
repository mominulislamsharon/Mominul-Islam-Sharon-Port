import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectScehema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    techStack: [{ type: String }],
    liveUrl: { type: String },
    frontendGithub: { type: String },
    backendGithub: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }, 
  },
  {
    timestamps: true,
  },
);

const ProjectModel = mongoose.model<IProject>("Project", projectScehema);

export default ProjectModel;
