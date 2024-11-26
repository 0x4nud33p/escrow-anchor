import { Router } from "express";
import { rateLimiter } from "../middlewares/rateLImiter.js";
import { shortenUrl,redirectUrl,getStats } from "../controllers/url.controller.js";

// Rate limit middleware applied to all routes
const router = Router();

router.use(rateLimiter);

router.post("/shorten", shortenUrl);
router.get("/:shortId", redirectUrl);
router.get("/stats/:shortId", getStats);

export default router;