const TelegramBot = require('node-telegram-bot-api');
const token = '689506207:AAFJ_JVZbBBhw8IxgeYa-cp_pwyvOlOsqv4';
const bot = new TelegramBot(token, {polling: true});
var chatId;

bot.onText(/\/date (.+)/, (msg, match) => {
    var chatID = msg.chat.id;
    var resp = match[1];
    resp.toString();
    var day = parseInt(resp.split('.')[0]);
    var month = parseInt(resp.split('.')[1]);
    var error = 'i feel that me gde-to naebivaut but i don`t understand where';
    var photo;

    var date = new Date(`2019, ${month}, ${day}`);
    var dayOfWeek = date.getDay();
    switch (dayOfWeek) {
        case 0:
            dayOfWeek = 'sunday';
            break;
        case 1:
            dayOfWeek = 'monday';
            break;
        case 2:
            dayOfWeek = 'tuesday';
            break;
        case 3:
            dayOfWeek = 'wednesday';
            break;
        case 4:
            dayOfWeek = 'thursday';
            break;
        case 5:
            dayOfWeek = 'friday';
            break;
        case 6:
            dayOfWeek = 'saturday';
            break;
        default:
            dayOfWeek = error;
            break;
    };
      // bot.sendMessage(chatID, day);
      //   bot.sendMessage(chatID, month);
      //     bot.sendMessage(chatID, dayOfWeek);

    if (dayOfWeek !== error &&
        dayOfWeek !== 'sunday' && dayOfWeek !== 'saturday') {
          if (day % 2 == 0) {
            photo = `img/pair/${dayOfWeek}.png`;
            bot.sendPhoto(chatID, photo, {caption: `${dayOfWeek}`});
          } else {
            photo = `img/unpair/${dayOfWeek}.png`;
            bot.sendPhoto(chatID, photo, {caption: `${dayOfWeek}`});
          }
      } else if(dayOfWeek == error) {
            bot.sendMessage(chatID, dayOfWeek);
       } else {
        bot.sendMessage(chatID, "Mb holiday ☺️");
      }
  });

bot.onText(/\/report (.+)/,
    (msg, match) => {
        var chatId = msg.chat.id;
        var key = match[1];
        var idB = "528629856";
        var idA = "505926819";
        bot.sendMessage(idB, key);
        bot.sendMessage(idA, key);
    });


bot.onText(/\/help/, (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, `
Command list :
/date
Example: "09.08"
09-day
08-month
/report
Example: "Your report"
    `);
});
