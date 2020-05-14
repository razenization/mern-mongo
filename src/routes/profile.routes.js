const { Router } = require("express");
const config = require("config");
const Link = require("../models/Link");
const User = require("../models/User");
const Image = require("../models/Image");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ dest: "static/temp/" });
const router = Router();
const fs = require("fs");

router.get("/", auth, async (req, resp) => {
  try {
    const user = await User.findById(req.user.userId);
    const links = await Link.find().where("_id").in(user.links).exec();
    const avatar = await Image.findById(user.avatar);
    const avatarSrc = avatar ? avatar.imageName : null;
    resp.json({ user, links, avatarSrc });
  } catch (e) {
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

router.post(
  "/updateAvatar",
  [auth, upload.single("avatar")],
  async (req, resp) => {
    try {
      console.log(req.file);
      const user = await User.findById(req.user.userId);
      const receivedImg = req.file;
      const existingAvatar = user.avatar || null;
      console.log(existingAvatar);
      if (existingAvatar) Image.findById(existingAvatar).remove();
      // await Image.find().remove();

      const imageData = fs.readFileSync(
        `${config.get("homeDir")}static\\temp\\${receivedImg.filename}`
      );

      const img = new Image({
        type: receivedImg.mimetype,
        data: imageData,
        isAvatar: true,
        imageName: "",
        owner: req.user.userId,
      });

      // await img.save().then((img) => {
      //   Image.findById(img, async (err, foundImage) => {
      //     if (err) throw err;
      //     try {
      //       const pathToPic = `/static/assets/img/${req.user.token}.png`
      //       fs.writeFileSync(
      //         __dirname + pathToPic,
      //         foundImage.data
      //       );
      //       foundImage.src = pathToPic;
      //       await foundImage.save();
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   });
      //   user.avatar = img;
      //   user.save();
      // });
      await img.save();

      console.log("here");

      // Downloading the image from Mongo

      const dbImg = await Image.findOne({ data: imageData });
      const pathToPic = `static\\assets\\img\\${req.user.userId}.${
        dbImg.type.split("/")[1]
      }`;
      fs.writeFile(config.get("homeDir") + pathToPic, dbImg.data, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      dbImg.imageName = pathToPic.split("\\").pop();
      await dbImg.save();
      user.avatar = dbImg;
      await user.save();

      resp.json(user);
    } catch (e) {
      console.log(e);
      resp.status(500).json({ message: "Something went wrong..." });
    }
  }
);

router.get("/adminStatus", auth, async (req, resp) => {
  try {
    const user = await User.findById(req.user.userId);
    resp.json({ isAdmin: user.isAdmin });
  } catch (e) {
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

module.exports = router;
