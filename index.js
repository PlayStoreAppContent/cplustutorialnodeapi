const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res,) => {
    res.send("Hello, I am Listening");
});

app.post('/appData', (req, res,) => {
    let fileName = req.body.fileName + '.json';
    let filePath = path.join(__dirname, "/assests/" + fileName);
    let content;
    try {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.send(content)
    } catch (err) {
        throw err;
    }
});

app.post('/updateData', (req, res) => {
    let fileName = req.body.fileName + '.json';
    let filePath = path.join(__dirname, "/assests/" + fileName)
    let content;
    let part = req.body.part;
    try {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (content && content[part] && content[part].length) {
            console.log("content[part]",content[part].length , req.body.id)
            for (let i = 0; i < content[part].length; i++) {
                if (req.body.id === content[part][i].id || req.body.id == content[part][i].id) {
                    req.body.like == true ? content[part][i].noOfLike++ : content[part][i].noOfLike
                    req.body.unlike == true ? content[part][i].noOfDisLike++ : content[part][i].noOfDisLike
                    fs.writeFileSync(filePath, JSON.stringify(content));
                    return res.send(content)
                }
            }
            return res.status(401).send({ error: "Content Mismatch !!!" });
        } else {
            return res.status(401).send({ error: "Content Mismatch !!!" });
        }
    } catch (err) {
        throw err;
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening");
});