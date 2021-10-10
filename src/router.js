const express = require('express')
const MainRouter = new express.Router()


MainRouter.get("/wallpapers", require("./Wallpaper/index.js"))

module.exports = MainRouter