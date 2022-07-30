const express = require("express");
var corss = require('cors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const DeliveryGuy = require("./DeliveryGuy");
const Products = require("./Products");
const Users = require("./Users");
const Orders = require("./Orders");
const stripe = require("stripe")(
  "sk_test_51LP2PLSGGBSK9hku75hdml7oheGbmmw0IsmsUWbkbkQbJ5DCcXmU92MfaJZGD9l8q3aimbQQkaycGWpE9kdTLsDW00U0x9bemd"
);

const app = express();
// const port = 8000;

// Middlewares
app.use(express.json());
app.use(corss());

// connection url

const connection_url =
  "mongodb+srv://kapoor:kapoor29@cluster0.qc1iyxa.mongodb.net/test";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// API

app.get("/", (req, res) => res.status(200).send("Home Page"));

// add product

app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>", productDetail);

  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// API for SIGNUP

app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    Users.create(userDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "User Created Succesfully" });
      }
    });
  }
});

// app.post("/lol", async(req, res) => {
//   const {id} = req.body;
//   console.log(req.body);
//   // get object using id
//   const object = await Orders.findById(id);
//   await object.save();
//   console.log("Object : ",object);
//   if(object){
//     return object
//   }else{
//     return "dafa ho";
//   }
// })


app.get('/scanme/:id', async (req, res) => {
  console.log(req.params.id);
  const id=req.params['id'];
  const object = await Orders.findById(id);
  if(object){
    res.send(object);
  }
  else{
    return "dafa ho";
  } 
})


// API for LOGIN

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});

// API for PAYMENT

app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request recieved for this ruppess", total);

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// API TO add ORDER DETAILS

app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("order added to database >> ", result);
    }
  });
});

app.post("/orders/get", (req, res) => {
  const email = req.body.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});



  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order._id === id);
      res.send(userOrders);
    }
  });
// });


app.listen(process.env.PORT || 10002, function(){
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});
