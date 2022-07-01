const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dvgqv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try{
        await client.connect()

        const userCollection = client.db('billing-databse').collection('user');

        //Add new User
        app.post('/registration', async (req, res) => {
            const newUser = req.body;
            // console.log(newProduct)
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })


    }finally{

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Billing Databse Start')
})

app.listen(port, () => {
    console.log("Server Started at port", port)
})