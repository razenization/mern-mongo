const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, resp) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return resp.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });
    const user = await User.findById(req.user.userId);
    user.links.push(link);

    await link.save();
    await user.save();

    resp.status(201).json({ link });
  } catch (e) {
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

router.get("/", auth, async (req, resp) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    resp.json(links);
  } catch (e) {
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

router.get("/:id", auth, async (req, resp) => {
  try {
    const link = await Link.findById(req.params.id);
    resp.json(link);
  } catch (e) {
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

module.exports = router;
