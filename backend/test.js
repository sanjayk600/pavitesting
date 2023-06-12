var http = require("http");
var url = require("url");
var fs = require("fs");
// import exports.db from backend/firebase.js
var express = require("express");
var cors = require("cors");

const bodyParser = require("body-parser");
const e = require("express");
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  let client; // Declare the client variable

  try {
    // Connection URI
    const uri = "mongodb://127.0.0.1:27017";

    // Create a new MongoClient
    client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB");

    // Return the connected client
    return client;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}
app.get("/lectureList", async function (req, res) {
  const client = await connectToDatabase();
  const db = client.db("lectureList");
  const collection = db.collection("lectures");
  const lectures = await collection.find({}).toArray();
  res.send(lectures);
});

// app.get("/register", async function (req, res) {
//   const queryObject = url.parse(req.url, true).query;
//   const user = {
//     name: queryObject.name,
//     type: queryObject.type,
//     email: queryObject.email,
//     password: queryObject.password,
//     dob: queryObject.dob,
//     studentrollno: queryObject.studentrollno,
//     department: queryObject.department,
//     areaofinterest: queryObject.areaofinterest,
//   };
//   if (queryObject.type == "lecturer") {
//     user.studentrollno = "";
//     user.status = "pending";
//   }
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("lectureList");
//     const collection = db.collection("users");
//     const docRef = await collection.insertOne(user);
//     if (docRef.insertedId) {
//       res.send("success");
//     } else {
//       res.send("User not added");
//     }
//   } catch (error) {
//     console.log(error);
//     res.send("Error occurred");
//   }
// });
app.post("/register", async function (req, res) {
  const user = {
    name: req.body.name,
    type: req.body.type,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    studentrollno: req.body.studentrollno,
    department: req.body.department,
    // areaofinterest: req.body.areaofinterest,
    // split string with , to array
    areaofinterest: req.body.areaofinterest.split(","),
  };
  if (req.body.type == "lecturer") {
    user.studentrollno = "";
    user.status = "pending";
  }
  try {
    const client = await connectToDatabase();
    const db = client.db("lectureList");
    const collection = db.collection("users");
    const docRef = await collection.insertOne(user);
    if (docRef.insertedId) {
      res.send("success");
    } else {
      res.send("User not added");
    }
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
  }
});

app.get("/checkUser", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const email = queryObject.email;
  const password = queryObject.password;
  try {
    const client = await connectToDatabase();
    const db = client.db("lectureList");
    const collection = db.collection("users");

    const user = await collection.findOne({ email: email, password: password });
    if (user) {
      res.send(user);
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
  }
});

app.get("checkEmail", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const email = queryObject.email;
  try {
    const client = await connectToDatabase();
    const db = client.db("lectureList");
    const collection = db.collection("users");

    collection.findOne({ email: email }, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send("success");
      } else {
        res.send("Invalid Credentials");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
  }
});

app.get("/lectureHalls", async function (req, res) {
  const client = await connectToDatabase();
  const db = client.db("lectureList");
  const collection = db.collection("lectureHalls");
  const lectureHalls = await collection.find({}).toArray();
  res.send(lectureHalls);
});

app.get("/addLectureHall", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const lectureHall = {
    name: queryObject.name,
    capacity: queryObject.capacity,
  };
  try {
    const client = await connectToDatabase();
    const db = client.db("lectureList");
    const collection = db.collection("lectureHalls");
    const docRef = await collection.insertOne(lectureHall);
    if (docRef.insertedId) {
      res.send("success");
    } else {
      res.send("Lecture Hall not added");
    }
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
  }
});

app.get("/deleteHall", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  try {
    const client = await connectToDatabase();
    const db = client.db("lectureList");
    const collection = db.collection("lectureHalls");
    const docRef = await collection.deleteOne({ _id: ObjectId(id) });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
  }
});

app.get("/lecturerRequests", async function (req, res) {
  const client = await connectToDatabase();
  const db = client.db("lectureList");
  const collection = db.collection("users");
  const lecturerRequests = await collection

    .find({ type: "lecturer", status: "pending" })
    .toArray();
  res.send(lecturerRequests);
});

app.get("/lecturerList", async function (req, res) {
  const client = await connectToDatabase();
  const db = client.db("lectureList");
  const collection = db.collection("users");
  const lecturerList = await collection.find({ type: "lecturer" }).toArray();
  res.send(lecturerList);
});
