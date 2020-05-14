const { Router } = require("express");
const Test = require("../models/Test");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, resp) => {
  try {
    const newTest = new Test({
      name: req.body.testName,
      task: req.body.taskQuery,
      defaultInput: req.body.defaultInput,
      correctQuery: req.body.output,
    });

    const formed = await eval("(async () => {" + newTest.task + "})()");
    const res = await eval("(async () => {" + newTest.correctQuery + "})()");
    newTest.expectedOutput = res.toString();
    const queryResult = await newTest.save();

    resp.json({
      message: "Correct query",
      queryResult,
      created: formed,
      expected: res,
    });
  } catch (e) {
    console.log(e);
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

router.get("/", auth, async (req, resp) => {
  try {
    const tests = await Test.find();
    resp.json({ tests });
  } catch (e) {
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

router.post("/query", auth, async (req, resp) => {
  try {
    if (
      req.body.query.search("remove") < 0 &&
      req.body.query.search("update") < 0
    ) {
      const result = await eval("(async () => {" + req.body.query + "})()");
      const expectedOutput = req.body.activeTest.expectedOutput;
      if (result.includes(expectedOutput) || expectedOutput.includes(result)) {
        const completed = await Test.findOne({
          name: req.body.activeTest.name,
        });
        const user = await User.findById(req.user.userId);
        user.completedTests.push(completed);
        console.log(user);
        await user.save();
        resp.json({
          user,
          result,
          message: "success",
        });
      } else {
        resp.json({
          result,
          message: "failed",
        });
      }
    } else {
      resp.json({ message: "Error processing your request" });
    }
  } catch (e) {
    console.log(e);
    resp.status(500).json({ message: "Something went wrong..." });
  }
});

module.exports = router;
