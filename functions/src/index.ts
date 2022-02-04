import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import vetRoutes from "./routes/vetRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/", vetRoutes);

export const api = functions.https.onRequest(app);
