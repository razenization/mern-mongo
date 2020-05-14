const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth
router.post(
  "/register",
  [
    check("email", "Incorrect email address.").isEmail(),
    check("password", "Minimal password length is 6.").isLength({ min: 6 }),
  ],
  async (req, resp) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration credentials.",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return resp
          .status(400)
          .json({ message: "This e-mail is already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      resp.status(201).json({ message: "User has been created" });
    } catch (e) {
      resp.status(500).json({ message: "Something went wrong..." });
    }
  }
);

// /api/auth
router.post(
  "/login",
  [
    check("email", "Incorrect email address.").normalizeEmail().isEmail(),
    check("password", "Minimal password length is 6.").exists(),
  ],
  async (req, resp) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: "Incorrect login credentials.",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return resp.status(400).json({ message: "No such user" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return resp.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      resp.json({ token, userId: user.id });
    } catch (e) {
      resp.status(500).json({ message: "Something went wrong..." });
    }
  }
);

module.exports = router;
