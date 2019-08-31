const TelegramBot = require('node-telegram-bot-api');
const token = '689506207:AAGqB2n5kP-lDGpAIZOdTA9pyYNBCP6atyk';
const bot = new TelegramBot(token, {pollingInterval: true});
var chatId,
    dayOfWeek,
    photo,
    error = 'i feel that me gde-to naebivaut but i don`t understand where';

bot.onText(/\/date (.+)/, (msg, match) => {
    var chatID = msg.chat.id;
    var resp = match[1];
    resp.toString();
    var checkDay = resp.split('.')[0];
    var checkMonth = resp.split('.')[1];
    var day = parseInt(checkDay);
    var month = parseInt(checkMonth);

    if (isNaN(checkDay) && isNaN(checkMonth)){
         bot.sendMessage(chatID, error);
       }else{
    let date = new Date(`2019, ${month}, ${day}`);
    let a = getDayOfWeek(date);

    if (dayOfWeek !== error && !isNaN(checkDay) &&
        !isNaN(checkMonth) && dayOfWeek !== 'sunday' &&
        dayOfWeek !== 'saturday') {
          if (day % 2 == 0) {
            photo = `img/pair/${dayOfWeek}.png`;
            bot.sendPhoto(chatID, photo, {caption: `${dayOfWeek}`});
          } else {
            photo = `img/unpair/${dayOfWeek}.png`;
            bot.sendPhoto(chatID, photo, {caption: `${dayOfWeek}`});
          }
      } else if(dayOfWeek == error) {
            bot.sendMessage(chatID, dayOfWeek);
       }else {
        bot.sendMessage(chatID, "Mb holiday ☺️");
      }
    }
  });

bot.onText(/\/report (.+)/,
    (msg, match) => {
        var userId = msg.chat.id;
        var key = match[1];
        var idB = "528629856";
        var idA = "505926819";
        userId == idA ? bot.sendMessage(key,'Если репорт не про баг - пиши в личку') : bot.sendMessage(idA,`from: ${userId} reason: ${key}`);
    });

bot.onText(/\/today/, (msg) => {
        chatId = msg.chat.id;
        var date = new Date();
        var todayMonth = date.getMonth()+1;
        var todayDay = date.getDate();
        getDayOfWeek(date);
        showDateForTodayAndTomorrow(dayOfWeek, todayDay, todayMonth, photo, chatId);
    });

    bot.onText(/\/tomorrow/, (msg) => {
            chatId = msg.chat.id;
            var date = new Date();
            date.setDate(date.getDate() + 1);
            var todayMonth = date.getMonth()+1;
            var todayDay = date.getDate();
            getDayOfWeek(date);
            showDateForTodayAndTomorrow(dayOfWeek, todayDay, todayMonth, photo, chatId);
        });

bot.onText(/\/alert (.+)/, (msg, match) => {
        var chatId = msg.chat.id;
        var chatPzId='-1001110402323';
        var resp = match[1];
        chatId == "505926819" ? bot.sendMessage(chatPzId, resp) : bot.sendMessage(chatId, 'nice try)');

      });

bot.onText(/\/help/, (msg) => {
    chatId = msg.chat.id;
    if(chatId !== 505926819){
    bot.sendMessage(chatId, `
Command list :
/today
/tomorrow
/date "date"
Example: "09.08"
09-day
08-month
/report "Your report"
    `);
  }else{
    bot.sendMessage(chatId,`
Command list :
==========write to bot===========
/alert "notification for pz-174"
/report "id"
===============================
/today
/tomorrow
/date "date"
Example: "09.08"
09-day
08-month
/report "Your report"
    `);
  }
});

function getDayOfWeek(somedate){
  dayOfWeek = somedate.getDay();
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
  }
  return dayOfWeek;
}
function showDateForTodayAndTomorrow(dayOfWeek, todayDay, todayMonth, photo, chatId){
  if (dayOfWeek !== 'sunday' && dayOfWeek !== 'saturday') {
        if (todayDay % 2 == 0) {
          todayDay < 10 ? todayDay = `0${todayDay}` : todayDay = todayDay;
          todayMonth < 10 ? todayMonth = `0${todayMonth}` : todayMonth = todayMonth;
          photo = `img/pair/${dayOfWeek}.png`;
          bot.sendPhoto(chatId, photo, {caption: `${dayOfWeek}, ${todayDay}.${todayMonth}`});
        } else {
          todayDay < 10 ? todayDay = `0${todayDay}` : todayDay = todayDay;
          todayMonth < 10 ? todayMonth = `0${todayMonth}` : todayMonth = todayMonth;
          photo = `img/unpair/${dayOfWeek}.png`;
          bot.sendPhoto(chatId, photo, {caption: `${dayOfWeek}, ${todayDay}.${todayMonth}`});
        }
    } else {
     bot.sendMessage(chatId, "Mb holiday ☺️");
    }
}
