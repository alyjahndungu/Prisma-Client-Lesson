import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";

const prisma = new PrismaClient();
const dotenv = require("dotenv");

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/artists", async (req: Request, res: Response) => {
  const artists = await prisma.artist.findMany();
  res.json({
    success: true,
    payload: artists,
    message: "Operation Successful",
  });
});

app.post("/artists", async (req: Request, res: Response) => {
  const result = await prisma.artist.create({
    data: { ...req.body },
  });
  res.json({
    success: true,
    payload: result,
    message: "Artist added successfully",
  });
});

//* 5. Sets the released field of a song to true.
app.put("/song/release/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await prisma.song.update({
    where: { id: Number(id) },
    data: { released: true },
  });
  res.json({
    success: true,
    payload: song,
  });
});

app.use((req: Request, res: Response, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`)
);
