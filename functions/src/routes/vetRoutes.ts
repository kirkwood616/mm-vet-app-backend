import { getClient } from "../db";
import express from "express";
import { ObjectId } from "mongodb";
import Customer from "../models/Customer";
import Pet from "../models/Pet";
import MedicalRecord from "../models/MedicalRecord";

const vetRoutes = express.Router();

// GET

// all customers
vetRoutes.get("/customers", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Customer>("customers")
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

// GET BY ID

// customer by e-mail
vetRoutes.get("/customer/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<Customer>("customers")
      .findOne({ email: email });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// customer
vetRoutes.get("/customer/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<Customer>("customers")
      .findOne({ _id: new ObjectId(id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Customer Not Found" });
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

// PUT

// customer
vetRoutes.put("/customer/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as Customer;
  delete data._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Customer>("customers")
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

// DELETE

export default vetRoutes;
