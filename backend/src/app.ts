import express, { Request, Response } from "express";
import cors from "cors";
import projectRoutes from './app/modules/project/project.route';
import blogRoutes from './app/modules/blog/blog.route';
import messageRoutes from './app/modules/message/message.route';


const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("My Portfolio API is running..")
})

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err
  });
});

export default app;