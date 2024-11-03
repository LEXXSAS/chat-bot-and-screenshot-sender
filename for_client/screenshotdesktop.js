const screenshot = require('screenshot-desktop');

module.exports = createScreenshotWithInterval = (time) => {
  setInterval(() => {
    const screenshotName = 'screenshotone';
    screenshot({ filename: './screenshots/' + screenshotName + '.png' })
    .then(() => {
      console.log(`Скриншот ${screenshotName} успешно создан!`);
    })
    .catch((err) => {
      console.log('Ошибка создания скриншота =>', err)
    })
  }, time);
};
