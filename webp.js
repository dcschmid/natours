const imagemin = require("imagemin");
const webp = require("imagemin-webp");

imagemin(["img/*.jpg","img/*.png"], "images", {
  use: [
    webp({
      quality: 75
    })
  ]
}).then(function() {
  console.log("Images converted!");
});
