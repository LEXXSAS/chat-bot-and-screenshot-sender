require('dotenv').config();
const path= require('path');
const {Telegraf} = require('telegraf');
const Markup = require('telegraf/markup');

const currentDirImage = path.join(__dirname, './images/');

const bot = new Telegraf(process.env.BOT_TOKEN, {});

bot.start((ctx) => {
  ctx.reply('Добро пожаловать. Для показа меню напишите /menu')
})

bot.help((ctx) => {
  ctx.reply('Отправьте /start для приветствия');
  ctx.reply('Отправьте /menu для показа меню');
});

bot.command('menu', (ctx) => {
  ctx.reply(
    'Выберите действие',
    Markup.inlineKeyboard([
      Markup.button.callback('Получить изображение', 'getimage'),
    ])
  );
});

const sendLocalImageWithTimeout = (ctx, time) => {
  ctx.replyWithPhoto({source: `${currentDirImage}screenshotone.png`});
  setTimeout(() => {
    ctx.reply(
      'Выберите действие',
      Markup.inlineKeyboard([
        Markup.button.callback('Получить изображение', 'getimage')
      ])
    );
  }, time)
}

bot.on('callback_query', async(ctx) => {
  if (ctx.callbackQuery.data === 'getimage') {
    // let yourImage = await getCat();
    try {
      sendLocalImageWithTimeout(ctx, 150);
    } catch (error) {
      console.log('Ошибка получения изображения =>', error)
    }
  }
});

bot.launch();
