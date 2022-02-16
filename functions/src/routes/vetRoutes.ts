import { getClient } from "../db";
import express from "express";
import { ObjectId } from "mongodb";
import User from "../models/User";
import Pet from "../models/Pet";
import MedicalRecord from "../models/MedicalRecord";
import MessageBoardPost from "../models/MessageBoardPost";
import AppointmentRequest from "../models/AppointmentRequest";

const vetRoutes = express.Router();

// GET

// all users
vetRoutes.get("/users", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<User>("users")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// all pets
vetRoutes.get("/pets", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client.db().collection<Pet>("pets").find().toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// all medical records
vetRoutes.get("/medical-records", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<MedicalRecord>("medical-records")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//general message board posts
vetRoutes.get("/message-board/general", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<MessageBoardPost>("message-board")
      .find({ board: "general" })
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// appointment requests
vetRoutes.get("/appointment-requests", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<AppointmentRequest>("appointment-requests")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET BY ID

// customer by e-mail
vetRoutes.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<User>("users")
      .findOne({ email: email });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// customer
vetRoutes.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<User>("users")
      .findOne({ _id: new ObjectId(id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// pet
vetRoutes.get("/pet/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<Pet>("pets")
      .findOne({ _id: new ObjectId(id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Pet Not Found" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST

// message board
vetRoutes.post("/message-board", async (req, res) => {
  const item = req.body as MessageBoardPost;
  try {
    const client = await getClient();
    await client
      .db()
      .collection<MessageBoardPost>("message-board")
      .insertOne(item);
    res.status(201).json(item);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// request appointment
vetRoutes.post("/appointment-requests", async (req, res) => {
  const item = req.body as AppointmentRequest;
  try {
    const client = await getClient();
    await client
      .db()
      .collection<AppointmentRequest>("appointment-requests")
      .insertOne(item);
    res.status(201).json(item);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT
vetRoutes.put("/pet/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as Pet;
  delete data._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Pet>("pets")
      .replaceOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      data._id = new ObjectId(id);
      res.json(data);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// customer
vetRoutes.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as User;
  delete data._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<User>("users")
      .replaceOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      data._id = new ObjectId(id);
      res.json(data);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// message board PUT

vetRoutes.put("/message-board/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as MessageBoardPost;
  delete data._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<MessageBoardPost>("message-board")
      .replaceOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      data._id = new ObjectId(id);
      res.json(data);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE ////////////////////////////////////////////////////////

//message board post DELETE
vetRoutes.delete("/message-board/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<MessageBoardPost>("message-board")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default vetRoutes;
