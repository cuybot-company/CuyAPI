
const fs = require('fs')
const path = require("path")
const WallpaperArray = fs.readdirSync(path.resolve(__dirname + "/../../Assets/Images/WallpaperCompressed"))
module.exports = async(req, res)=>{
    const { params } = req
    const chosenGenre = params.genre
    if(!fs.existsSync(path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${chosenGenre}`))){
        res.status= 404
        return res.send({
            Status: 404,
            Message: "Genre not found",
            Genres: WallpaperArray
        })
    }
    const Wallpapers = fs.readdirSync(path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${chosenGenre}`))
    res.status = 200
    return res.send({
        Status: 200,
        ChosenGenre: chosenGenre,
        list: Wallpapers,
        Genres: WallpaperArray
    })
}