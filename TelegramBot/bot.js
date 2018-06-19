var TelegramBot = require('node-telegram-bot-api');

var utf8 = require('utf8');

var Helper = require('./helper');
var helper = new Helper();

// Устанавливаем токен, который выдавал нам бот.
var token = '285444285:AAGVMFo4T5Gp7D3ORp27G3R9XRAc-QbvnZM';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling : true});

var loginUser = [];



//TOODO : разделенные сессии
var sessions = [];

var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};

var commands = {
  "/start" : {
    "description" : "начало роботы с ботом"
  },
  "/reg": {
    "description": "регистрация"
  },
  "/auth" : {
    "description" : "авторизация, формат: /auth %логин%"
  },
  "/myorders" : {
    "description" : "вывод списка заказов и информации о них"
  },
}

bot.on('text', function (msg, match){
    var chatId = msg.chat.id;
    var messageId = msg.message_id;
    var text = msg.text;
    var date = msg.date;
    var usr = msg.from.first_name;
    var session = getSessionById(chatId);
    session = session == false ? createSession(chatId, false) : session;
    var sessionId = session.id;

    var text = /\/(.+) (.+)/.exec(text) || /\/(.+)/.exec(text) || /(.+)/.exec(text);
    console.log(text);
    if(!session.input){
      var command = text[1];
      var param = text[2];
      var textInput = -1;
    }else{
      var textInput = text[1];
      var command = null;
    }

    switch(command){
      case 'start':
        var text = '';
        text += 'Рад вас видеть, ' + usr + '!\n';
        text += 'Я буду вашим помощником.\n';
        text += 'Вы можете узнать у меня список своих заказов, информацию о них и статус их выполнения.';
        text += '\n\n';
        text += 'Эта информация привязана к уникальному логину, который вы можете получить у нашего менеджера';
        text += '\n\n';
        text += 'Отправте мне команду /help, что бы увидеть список всех команд';
        bot.sendMessage(chatId, text);
      break;
      case 'help':
        var text = '';
        for(var command in commands){
          text += command + ' - ' + commands[command].description + '\n';
        }
        bot.sendMessage(chatId, text);
      break;
      case 'reg':
        bot.sendMessage(chatId, 'Используйте команду /stopreg, что бы остановить регистрацию.')
          .then(reg(chatId, sessionId));
      break;
      case 'auth':
        bot.sendMessage(chatId, 'Используйте команду /stopauth, что бы остановить авторизацию.')
          .then(auth(chatId, sessionId));
      break;
      case 'isauth':
        var isauth = isAuth(chatId);
        if(isauth == 0){
          bot.sendMessage(chatId, 'Вход не выполнен');
        }else{
          bot.sendMessage(chatId, 'Вход выполнен');
        }
      break;
      case 'myorders':
        var isauth = isAuth(chatId);
        if(isauth != 0){
          var login = findLoginById(chatId);
          var orders = helper.getOrdersByLogin([login]);
          var msg = '';

          for(var order in orders){
            var nowOrder = orders[order];
            msg += "Заказ №" + nowOrder.numberOrder + ":\n";
            msg += " Пакет услуг: " + nowOrder.packageServices + "\n";
            msg += " Сумма к оплате: " + nowOrder.cost + "\n";
            msg += " Отвечающий менеджер: " + nowOrder.manager + "\n";
            msg += " Номер менеджера: " + nowOrder.phoneOfManager + "\n";
            msg += " Статус разработки: " + nowOrder.statusWork + "\n\n";
          }

          bot.sendMessage(chatId, msg);
        }else{
          bot.sendMessage(chatId, 'Сначала выполните вход');
        }
      break;
    }
});

function reg(chatId, sessionId){
  bot.sendMessage(chatId, 'Введите логин', opts)
    .then(function(sended){
      var messageId = sended.message_id;
      bot.onReplyToMessage(chatId, messageId, function(msg){
        var login = msg.text;
        var isset = helper.isUniqueLogin([login]);
        if(isset){
          sessions[sessionId].tmp.login = login;
          bot.sendMessage(chatId, 'Введите пароль', opts)
            .then(function(sended){
              var messageId = sended.message_id;
              bot.onReplyToMessage(chatId, messageId, function(msg){
                sessions[sessionId].tmp.password = msg.text;
                bot.sendMessage(chatId, 'Введите имя', opts)
                  .then(function(sended){
                    var messageId = sended.message_id;
                    bot.onReplyToMessage(chatId, messageId, function(msg){
                      sessions[sessionId].tmp.firstname = msg.text;
                      bot.sendMessage(chatId, 'Введите фамилию', opts)
                        .then(function(sended){
                          var messageId = sended.message_id;
                          bot.onReplyToMessage(chatId, messageId, function(msg){
                            sessions[sessionId].tmp.lastname = msg.text;
                            bot.sendMessage(chatId, 'Введите номер', opts)
                              .then(function(sended){
                                var messageId = sended.message_id;
                                bot.onReplyToMessage(chatId, messageId, function(msg){
                                  sessions[sessionId].tmp.phone = msg.text;
                                  var params = [sessions[sessionId].tmp.login, 
                                                sessions[sessionId].tmp.password, 
                                                sessions[sessionId].tmp.firstname, 
                                                sessions[sessionId].tmp.lastname, 
                                                sessions[sessionId].tmp.phone];
                                  helper.createUser(params);
                                  sessions[sessionId].tmp = {};
                                  bot.sendMessage(chatId, 'Регистрация прошла успешно. Используйте команду /auth, что бы войти.');
                                });
                              });
                          });
                        });
                    });
                  });
              });
            });
        }else{
          bot.sendMessage(chatId, 'Этот логин занят. Попробуйте другой');
          reg(chatId, sessionId);
        }
      });
    });
}

function auth(chatId, sessionId){
  bot.sendMessage(chatId, 'Введите логин', opts)
    .then(function(sended){
      var messageId = sended.message_id;
      bot.onReplyToMessage(chatId, messageId, function(msg){
        sessions[sessionId].tmp.login = msg.text;
        bot.sendMessage(chatId, 'Введите пароль', opts)
          .then(function(sended){
            var messageId = sended.message_id;
            bot.onReplyToMessage(chatId, messageId, function(msg){
              sessions[sessionId].tmp.password = msg.text;
              var messageId = sended.message_id;
              var isset = helper.isUniqueLogin([sessions[sessionId].tmp.login]);
              var isPassValid = helper.isPassValid([sessions[sessionId].tmp.login, sessions[sessionId].tmp.password]);

              if(isset == 0){
                if(isPassValid == 0){
                  bot.sendMessage(chatId, 'Логин или пароль не правильный');
                  sessions[sessionId].tmp = {};
                  auth(chatId, sessionId);
                }
              }else{
                bot.sendMessage(chatId, 'Логин или пароль не правильный');
                sessions[sessionId].tmp = {};
                auth(chatId, sessionId);
              }
              if(isset == 0 && isPassValid == 1){
                var user = [chatId, sessions[sessionId].tmp.login];
                pushIntoLoginUser(user);console.log(loginUser);
                sessions[sessionId].tmp = {};
                bot.sendMessage(chatId, 'Вход успешно выполнен.\nВы вошли под логином <b>' + user[1] + '</b>', {parse_mode : 'HTML'});
                return 1;
              }
            });
        });
    });
  });
}

function pushIntoLoginUser(user){
  for(var i = 0; i < loginUser.length; i++){
    if(loginUser[i][0] == user[0]){
      loginUser[i][1] = user[1];
      return 1;
    }
  }

  loginUser.push(user);
  return 1;
}

function isAuth(id){
  for(var i = 0; i < loginUser.length; i++){
    if(loginUser[i][0] == id){
      return 1;
    }
  }
  return 0;
}

function findLoginById(id){
  for(var i = 0; i < loginUser.length; i++){
    if(loginUser[i][0] == id){
      return loginUser[i][1];
    }
  }
  return 0;
}

function createSession(chatId, login){
  var id = sessions.length;
  var session = {
    chatId : chatId,
    id : id,
    login : false,
    tmp : {}
  }
  sessions.push(session);

  return session;
}

function getSessionById(chatId) {
  for(var i = 0; i < sessions.length; i++){
    if(sessions[i].chatId == chatId){
      return sessions[i];
    }
  }

  return false;
}
