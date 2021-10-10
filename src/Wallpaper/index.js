const fs = require("fs")
const path = require("path")
const WallpaperArray = fs.readdirSync(path.resolve(__dirname + "/../../Assets/Images/WallpaperCompressed"))
console.log(WallpaperArray)
module.exports = async (req, res)=> {
  if(req.query.generate?.toLowerCase() == "true" && !req.query.genre){
    const genrePick = Math.floor(Math.random() * (WallpaperArray.length - 1))
    const genre = WallpaperArray[genrePick]
    const WallpapersArray = fs.readdirSync(path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${genre}`))
    const wallpaperpick = Math.floor(Math.random() * (WallpapersArray.length - 1))
    const wallpaper = WallpapersArray[wallpaperpick]
    const wallpaperpath = path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${genre}/${wallpaper}`)
    res.status = 200
    return res.sendFile(wallpaperpath)
  }else if(req.query.generate?.toLowerCase() == "true" && req.query.genre){
    const genreChoice = req.query.genre
    if(!fs.existsSync(path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${genreChoice}`))){
      res.status = 404
      return res.json({
        Status: 404,
        Message: "Genre not found"
      })
    }
    const wallpaperGenreArray = fs.readdirSync(path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${genreChoice}`))
    const wallpaperGenrePick = Math.floor(Math.random() * (wallpaperGenreArray.length - 1))
    const wallpaperGenre = wallpaperGenreArray[wallpaperGenrePick]
    const wallpaperGenrePath = path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${genreChoice}/${wallpaperGenre}`)
    res.status = 200
    return res.sendFile(wallpaperGenrePath)
  }
  res.status = 200
    return res.json({
      Status: 200,
      Genres: WallpaperArray
    })
}