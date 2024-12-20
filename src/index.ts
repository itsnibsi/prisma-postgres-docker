import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const items = await prisma.item.findMany();
  res.send(items);
});

app.post("/", async (req: Request, res: Response) => {
  const item = await prisma.item.create({
    data: {
      name: req.body.name,
    },
  });
  res.send(item);
});

app.listen(port, () => {
  console.log(`[server] is running on port ${port}`);
});
