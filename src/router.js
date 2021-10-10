const express = require('express')
const MainRouter = new express.Router()


MainRouter.get("/wallpapers", require("./Wallpaper/index.js"))
MainRouter.get("/wallpapers/:genre", require("./Wallpaper/genre.js"))
MainRouter.get("/wallpapers/:genre/:image", require("./Wallpaper/image.js"))
module.exports = MainRouter