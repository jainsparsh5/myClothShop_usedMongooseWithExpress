const mongoose = require("mongoose");
const Item = require("./models/item");

mongoose
  .connect("mongodb://127.0.0.1:27017/myClothStore")
  .then(() => {
    console.log("Mongo Connection Opened");
  })
  .catch((err) => {
    console.log("Oh no mongo connection Error!");
  });


const seedItems = [
    {
        print: 'Sakura' ,
        price: 1999 ,
        size: 'm' 
    },
    {
        print: 'Mickey Mouse Oversized' ,
        price: 2499 ,
        size: 'l',
    },
    {
        print: 'Weed God' ,
        price: 2999 ,
        size: 'm'
    },
    {
        print: 'Light Pink Oversized Heavyweight',
        price: 2499 ,
        size:'s'
    }
];

Item.insertMany(seedItems)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })