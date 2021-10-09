require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();

const authMiddleware = require("./middlewares/auth.middleware");

// most importants middlewares
app.use(express.json());
app.use(cors());

//...import routes
const authRoutes = require("./routes/auth.routes");
const feedRoutes = require("./routes/feed.routes");
const postRoutes = require("./routes/post.routes");

//authentication
app.use("/auth", authRoutes);

app.use(authMiddleware);

//feed interations
app.use("/feed", feedRoutes);

//posts interations
app.use("/post", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server runing in port ${process.env.PORT}`);
});


process.once("SIGUSR2", function () {
  gracefulShutdown(function () {
    process.kill(process.pid, "SIGUSR2");
    process.exit(0);
  });
});
 
process.on("SIGINT", function () {
  process.kill(process.pid, "SIGINT");
  process.exit(0);
});
