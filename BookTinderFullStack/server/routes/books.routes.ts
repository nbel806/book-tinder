import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.json("Books");
});

export default router;
