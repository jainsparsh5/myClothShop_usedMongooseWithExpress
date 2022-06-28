const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');


const Item = require("./models/item");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/myClothStore")
  .then(() => {
    console.log("Connection Opened");
  })
  .catch((err) => {
    console.log("Error!!!!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get("/items", async (req, res) => {
  const items = await Item.find({});
  res.render("items/index", { items });
});

app.get("/items/new", (req, res) => {
  res.render("items/new");
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/items/${newItem._id}`);
});

app.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  res.render("items/show", { item });
});

app.get("/items/:id/edit", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  res.render("items/edit", { item });
})

app.put('/items/:id' , async(req,res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id , req.body , {runValidators: true , new: true});
    res.redirect(`/items/${item._id}`)
});

app.delete('/items/:id' , async (req,res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id)
    res.redirect('/items');
})

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
