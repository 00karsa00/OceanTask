const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

var itemList = [];

app.post("/addData", (req, res) => {
  let reqData = req.body;
  let arr1 = reqData.arr1.split(",");
  let arr2 = reqData.arr2.split(",");
  arr1.map((item) => {
    arr2.map((item2) => {
      var data = {
        name: reqData.name,
        mobile: reqData.mobile,
        email: reqData.email,
        amount: reqData.amount,
        combination: `${item} & ${item2}`,
      };
      itemList.push(data);
    });
  });
  return res.send({ error: false, message: "Data Added Successfully" });
});

app.get("/getData", (req, res) => {
  return res.send({ error: false, data: itemList });
});

app.post("/updateData", (req, res) => {
  let data = req.body;
  let item = itemList[data.id];
  item.name = data.name;
  item.mobile = data.mobile;
  item.email = data.email;
  item.amount = data.amount;
  return res.send({ error: false, message: "Update Successfully" });
});

app.post("/delete", (req, res) => {
    itemList.splice(req.body.id, 1);
    return res.send({ error: false, message: "Delete Successfully" });
});

app.listen(8081, () => {
  console.log("Server Start on Port 8081");
});
