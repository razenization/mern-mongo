const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/link", require("./src/routes/link.routes"));
app.use("/api/profile", require("./src/routes/profile.routes"));
app.use("/api/test", require("./src/routes/test.routes"));
app.use("/t", require("./src/routes/redirect.routes"));
app.use(express.static("static"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || config.get("port");
const mongoURI = process.env.MONGODB_URI || config.get("mongoUri");
console.log(mongoURI);

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () =>
      console.log(`App has been launched on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error: ", e.message);
    process.exit(1);
  }
}

start();
