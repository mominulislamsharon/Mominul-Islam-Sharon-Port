import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import projectRoutes from './app/modules/project/project.route';
import blogRoutes from './app/modules/blog/blog.route';
import messageRoutes from './app/modules/message/message.route';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mominulislamsharon.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("My Portfolio API is running..");
});

// 404 Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

export default app;