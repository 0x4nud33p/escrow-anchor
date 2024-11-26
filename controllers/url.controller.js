import shortid from "shortid";
import Url from "../models/url.model.js";
import dotenv from "dotenv";

dotenv.config();

const shortenUrl = async (req, res) => {
  const { url } = req.body;

  // Validate URL
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  // Check if the URL is already shortened
  try {
    const existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortId}`,
      });
    }

    // Generate a new shortId
    const shortId = shortid.generate();
    const newUrl = new Url({ originalUrl: url, shortId });

    await newUrl.save();

    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: "URL not found" });

    // Update click count and last accessed timestamp
    url.clicks++;
    url.lastAccessed = new Date();
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: "URL not found" });

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { shortenUrl, redirectUrl, getStats };
