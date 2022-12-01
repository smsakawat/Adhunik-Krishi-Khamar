const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

// Creating express app
const app = express();

// Connect to mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://db_user_pritam:${process.env.DB_PASS}@cluster0.xrzq7vz.mongodb.net/?retryWrites=true&w=majority`;

// routes
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Creating middlewares
app.use(cors());
app.use(express.json());

// CONNETIN TO  DB AND CREATING REST APIS
async function run() {
  try {
    await client.connect();
    console.log("db is connected");
    const database = client.db("AdhunikKrishiKhamar");
    // Create collections
    const userCollection = database.collection("User-collection");
    const agroGibCollection = database.collection("Agro-gib");
    const recentNewsColletion = database.collection("All-recent-news");
    const otherNewsCollection = database.collection("Other-news-collection");
    const goveshonaTipsCollection = database.collection("Goveshona-tips");
    const farmToProkritiCollection = database.collection("Farm-to-Prokriti");
    const digitalTechnologiesCollection = database.collection(
      "Digital-technologies"
    );

    // RES-APIS

    // post api for saving user info
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      const result = await userCollection.insertOne(userInfo);
      res.json(result);
    });

    // get request for  getting agro-gibs  from sever
    app.get("/agros", async (req, res) => {
      const result = await agroGibCollection.find({}).toArray();
      res.json(result);
    });

    // get  api for loading single agro gib  information
    app.get("/agros/:id", async (req, res) => {
      const agroId = req.params.id;
      const query = { _id: ObjectId(agroId) };
      const result = await agroGibCollection.findOne(query);
      res.json(result);
    });

    // get api for loading all  new nes
    app.get("/recentNews", async (req, res) => {
      const result = await recentNewsColletion.find({}).toArray();
      res.json(result);
    });

    // get api for loading single  new  news details
    app.get("/recentNews/:id", async (req, res) => {
      const newsId = req.params.id;
      const query = { _id: ObjectId(newsId) };
      const result = await recentNewsColletion.findOne(query);
      res.json(result);
    });

    // get  api for  loading other news
    app.get("/otherNews", async (req, res) => {
      const result = await otherNewsCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single other news information
    app.get("/otherNews/:id", async (req, res) => {
      const newsId = req.params.id;
      const query = { _id: ObjectId(newsId) };
      const result = await otherNewsCollection.findOne(query);
      res.json(result);
    });

    // get  api for  laoding all  goveshona  tips
    app.get("/goveshonaTips", async (req, res) => {
      const result = await goveshonaTipsCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single goveshona tips
    app.get("/goveshonaTips/:id", async (req, res) => {
      const tipsId = req.params.id;
      const query = { _id: ObjectId(tipsId) };
      const result = await otherNewsCollection.findOne(query);
      res.json(result);
    });

    // get  api for loading all farm to prokriti
    app.get("/farmToPakhriti", async (req, res) => {
      const result = await farmToProkritiCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single farom  to prokriti details
    app.get("/goveshonaTips/:id", async (req, res) => {
      const farmId = req.params.id;
      const query = { _id: ObjectId(farmId) };
      const result = await farmToProkritiCollection.findOne(query);
      res.json(result);
    });

    // get api for showing  6  digital  technologies (ECOM)
    // get request cycles from home
    app.get("/digitalTechnologies", async (req, res) => {
      const result = await digitalTechnologiesCollection
        .find({})
        .limit(7)
        .toArray();
      res.json(result);
    });

    // get api for loading all digital technologies (ECOM)
    app.get("/digitalTechnologies/all", async (req, res) => {
      console.log("hitted server");
      const result = await digitalTechnologiesCollection.find({}).toArray();
      res.json(result);
    });

    // get  api for loadin  single digital technology details
    app.get("/digitalTechnologies/:id", async (req, res) => {
      const techId = req.params.id;
      console.log(`Hitted the server ${techId}`);
      const query = { _id: ObjectId(techId) };
      const result = await digitalTechnologiesCollection.findOne(query);
      res.json(result);
    });

    // delete api  for admin to delete  a single  digital  technology
    app.delete("/digitalTechnologies/:id", async (req, res) => {
      const techId = req.params.id;

      const query = { _id: ObjectId(techId) };
      const result = await digitalTechnologiesCollection.deleteOne(query);
      res.json(result);
    });

    // post api for  admin to create a digital technology
    app.post("/addTechnology", async (req, res) => {
      const newTech = req.body;
      const result = await digitalTechnologiesCollection.insertOne(newTech);
      res.json(result);
    });

    // delete api for admin to delete  a digital technology
    app.delete("/technologies/delete/:id", async (req, res) => {
      const techId = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await digitalTechnologiesCollection.deleteOne(query);
      res.json(result);
    });

    // post api for adding a cylcle by admin
    app.post("/addProduct", async (req, res) => {
      const newBiycle = req.body;
      const result = await digitalTechnologiesCollection.insertOne(newBiycle);
      res.json(result);
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir());
app.get("/", (req, res) => {
  res.send(`Server is  running on port ${port}`);
});

// Listening the app  on port -5000
app.listen(port, () => {
  console.log(`Listening  the app  on port ${port}`);
});
