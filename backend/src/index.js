import express from "express";
import cors from "cors";
import morgan from "morgan";
import color from "chalk";
import { PORT, SECRET_KEY } from "./config/config.js";
import database from "./db/database.js";
import userRouter from "./routers/user.routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import publicationsRoutes from "./routers/publications.routes.js";
import fileUpload from "express-fileupload";
import mediaRouter from "./routers/medias.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5500", "http://localhost:3000", "http://127.0.0.1:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'None', },
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
  })
);
app.use(cookieParser());
app.use(userRouter);
app.use(publicationsRoutes);
app.use(mediaRouter);
database();
app.listen(PORT, () => {
  console.log(color.blue("server is running in http://localhost:4000"));
});
