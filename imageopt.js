const imagemin = require("imagemin");
const webp = require("imagemin-webp");
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


(async () => {
    const files = await imagemin(['img/*.{jpg,png}'], 'images', {
        plugins: [
            imageminJpegtran({progressive: true}),
            imageminPngquant({quality: '65-80'})
        ],
    });
 
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();

(async () => {
    const files = await imagemin(['img/*.{jpg,png}'], 'images', {
        plugins: [
            webp({quality: 75})
        ],
    });
 
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();

