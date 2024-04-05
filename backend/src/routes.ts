import { Router, Request, Response } from "express";
import { getAllPosts, addPost, getAllPostsByTopic } from "./posts";

const router: Router = Router();

type PostsBody = Parameters<typeof addPost>[0];

router.post("/posts", (req: Request<null, PostsBody>, res: Response) => {
  try {
    addPost(req.body);
    res.status(201).send("Post created succesfully.");
  } catch {
    // TODO: add validation for inputs
    // TODO: send object with errors for each failed field (e.x { author: "Value cannot be longer than 20 characters" })
    res.status(400).send("Post creation failed.");
  }
});

router.get("/posts", (_: Request, res: Response) => {
  res.send(getAllPosts());
});

router.get(
  "/posts/topic/:topic",
  (req: Request<{ topic: string }>, res: Response) => {
    const topic = req.params.topic;

    try {
      res.status(200).json(getAllPostsByTopic(topic));
    } catch {
      // TODO: add validation for inputs
      res.status(400).send("Wrong topic.");
    }
  }
);

export default router;
