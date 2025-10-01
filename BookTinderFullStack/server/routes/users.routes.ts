import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.json("Users");
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  res.json("Done");
});

export default router;
