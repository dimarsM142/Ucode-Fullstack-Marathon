const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const sharp = require("sharp");

app.use(express.json());
app.use("/public", express.static(__dirname + "/"));
app.use(express.urlencoded({ extended: true }));

app.get("/upload", async function (req, res) {
    const path = "./image.png";
    let url = req.query.url;
    request.head(url, async function () {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on("close", await imageCheck);
    });
    function imageCheck() {
        let arr = [
            [
                [0, 0, 1],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [
                [0, 0, 0],
                [0, 0, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 1],
            ],
        ];
        for (let i = 1; i <= 4; i++) {
            let img = sharp("image.png");
            if (i >= 2) {
                img = img.recomb(arr[i - 2]);
            }
            img.resize(250, 250).toFile(`image${i}.png`, function (err, info) {
                if (i === 4) {
                    res.json({
                        img: [`image1.png`, `image2.png`, `image3.png`, `image4.png`],
                    });
                }
            });
        }
    }
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});
