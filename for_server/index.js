// @ts-nocheck
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const fs = require('fs');
const path= require('path');
const fileUpload = require('express-fileupload');

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const currentDirImage = path.join(__dirname, './images/');

const moveImageMiddleware = async(req, res, next) => {
  if (req.files.file.name !== undefined) {
    req.files.file.mv(currentDirImage + req.files.file.name);
    console.log('Скриншот успешно сохранен на сервере!')
    next()
  } else {
    console.log('Непредвиденная ошибка moveImageMiddleware')
    next()
  }
}

app.post('/file', moveImageMiddleware, (req, res) => {
    res.send('Скриншот успешно сохранен на сервере!')
});

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));
