const express = require("express");
const bodyParser = require("body-parser");
var toJson = require("to-json");

const app = express();
const port = 3000;

const { makeFile, getProductImageBase64 } = require("./excel");

app.use(bodyParser.json({ type: "application/*+json" }));

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/readfile", (req, res) => {
	makeFile("/Users/monkey/Desktop/x.xlsx", "/Users/monkey/Desktop/y.xlsx").then(
		data => {
			res.send(data);
		}
	);
	// getProductImageBase64("macbook air").then(data => {
	// 	console.log(data.extension);
	// });
});

app.listen(port, () => {
	console.log(`-------------------------------------`);
	console.log(`Example app listening on port ${port}!`);
});
