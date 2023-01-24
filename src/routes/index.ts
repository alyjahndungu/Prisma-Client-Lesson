import express, { Express, Request, Response } from "express";
const router = express.Router();
const auth = require("./auth");
const createError = require("http-errors");

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/auth", auth);

router.use(async (req: Request, res: Response, next) => {
  next(createError.NotFound("Route not Found"));
});

router.use((err: any, req: Request, res: Response, next: any) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});
