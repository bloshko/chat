import express, { Express, Response } from "express";
import routes from "./routes";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (_, res: Response) => {
  res.send("Backend is running!");
});

const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
