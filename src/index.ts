import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { myDataSource } from "./Dataconnext/app-data-source";
import rou from "./Rout_api/router_";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from './tableconnext/meteorological_data';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use('/api', rou);

app.post('/api/test', (req, res) => {
  console.log(req.body);
  res.send("Hello from /api/test");
});

app.get("/api/check-auth", (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
       res.status(401).json({ message: "ไม่พบ Token" });
    }

    const secret = process.env.JWT_SECRET || "mySuperSecretKey";
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
         res.status(401).json({ message: "Token ไม่ถูกต้อง" });
      }
      res.json({ message: "Authorized", user: decoded });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
});


app.post("/api/logout", (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
