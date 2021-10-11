const express = require("express");
const morgan = require("morgan");
const compression = require("compression")
const fs = require("fs")
const path = require("path")
require("dotenv").config();


if(!fs.existsSync(path.resolve(__dirname + "/Assets/Images/WallpaperBuild"))){
  fs.mkdirSync("./Assets/Images/WallpaperBuild")
}


const app = new express()
const router = require("./src/router")
const compress = require("./utils/wallpapercompression.js")
compress()
app.use(express.json())
app.use(morgan("dev"))
app.use(compression())
app.use("/api", router)


app.all("/", (req, res) => {
  res.status = 200
  res.json({
    Status: 200,
    Message: "Welcome to the CuyAPI"
  })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  
})
