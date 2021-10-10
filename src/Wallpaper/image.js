const fs = require("fs")
const path = require("path")
module.exports = async(req, res) => {
    const { params } = req
    const genre  = params.genre
    const image = params.image
    const imagePath = path.resolve(__dirname + `/../../Assets/Images/WallpaperCompressed/${genre}/${image}`)
    if(!fs.existsSync(imagePath)){
        res.status = 404
        return res.json({
            Status: 404,
            Message: "Genre or image not found"
        })
    }

    res.status = 200
    return res.sendFile(imagePath)




}