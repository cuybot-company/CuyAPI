const compress_images = require("compress-images")
const fs = require("fs")
const path = require("path")
module.exports = async()=> {
    if(!fs.existsSync(path.resolve(__dirname + `/../Assets/Images/WallpaperCompressed`))){
        fs.mkdir(path.resolve(__dirname + `/../Assets/Images/WallpaperCompressed`))
    }


    var Finished = 0
    var NotConverted = 0
    var Failed = 0
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
            if(completed){
                Finished = Finished + 1
            }
            if(error){
                Failed = Failed + 1
            }
        }
        );
    }
    
    const genreArray = fs.readdirSync(path.resolve(__dirname + `/../Assets/Images/Wallpaper`))
    for(const genre of genreArray){
        const imagegenreArray = fs.readdirSync(path.resolve(__dirname + `/../Assets/Images/Wallpaper/${genre}`))
        for(const image of imagegenreArray){
            const imageFromPath = __dirname+ `/../Assets/Images/Wallpaper/${genre}/${image}`
            const imageToPath = __dirname+ `/../Assets/Images/WallpaperCompressed/${genre}/`
            if(!fs.existsSync(path.resolve(__dirname + `/../Assets/Images/WallpaperCompressed/${genre}/${image}`))){
                await compress(imageFromPath, imageToPath)
            }else{
                NotConverted = NotConverted + 1
            }
            
        }
    }
    console.log("Finished: ", Finished)
    console.log("NotConverted: ", NotConverted)
    console.log("Failed:", Failed)
}