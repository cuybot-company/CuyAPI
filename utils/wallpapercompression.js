const compress_images = require("compress-images")
const fs = require("fs")
const path = require("path")
module.exports = async()=> {

    const compress = async(pathFromFile, pathToFile) => {
        await compress_images(pathFromFile, pathToFile, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: 'webp', command: false} },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
        );
    }
    
    const genreArray = fs.readdirSync(path.resolve(__dirname + `/../Assets/Images/Wallpaper`))
    for(const genre of genreArray){
        const imagegenreArray = fs.readdirSync(path.resolve(__dirname + `/../Assets/Images/Wallpaper/${genre}`))
        for(const image of imagegenreArray){
            const imageFromPath = path.resolve(__dirname+ `/../Assets/Images/Wallpaper/${genre}/${image}`)
            const imageToPath = path.resolve(__dirname+ `/../Assets/Images/WallpaperCompressed/${genre}/${image}`)
            await compress(imageFromPath, imageToPath)
        }
    }
}