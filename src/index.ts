import axios from "axios"
import * as fs from 'fs'
import * as path from 'path'
import express,{Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { myDataSource } from "./Dataconnext/app-data-source"
import rou from "./Rout_api/router_"


const app = express()
app.use(express.json())
app.use(cors())

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use('/api', rou)

app.post('/api/test', (req, res) => {
  console.log(req.body);
  res.send("Hello from /api/test");
})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})