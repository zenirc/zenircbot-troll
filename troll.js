var ZenIRCBot = require('zenircbot-api').ZenIRCBot
var zen = new ZenIRCBot()
var sourceUrl = 'https://github.com/zenirc/zenircbot'

zen.register_commands(
    'troll.js',
    [
        {
            name: 'ls',
            description: 'Trolls the user for saying ls'
        }, {
            name: 'irssi',
            description: 'When someone mentions irssi, suggests weechat.'
        }
    ]
)

var privmsg = zen.filter({verison: 1, type: 'privmsg'})
privmsg.on('data', function(msg) {
    if (/^ls$/.test(msg.data.message)) {
        zen.send_privmsg(msg.data.channel,
                         msg.data.sender + ': http://is.gd/afolif')
    }
})

var directed = zen.filter({version: 1, type: 'directed_privmsg'})
directed.on('data', function(msg) {
    var who = ['whoareyou', 'who are you?', 'source']
    if (/^ping$/i.test(msg.data.message)) {
        zen.send_privmsg(msg.data.channel, msg.data.sender + ': pong!')
    } else if (who.indexOf(msg.data.message) != -1) {
        zen.redis.get('zenircbot:nick', function(err, nick) {
            zen.send_privmsg(msg.data.channel,
                             'I am ' + nick + ', an instance of ' +
                             'ZenIRCBot. My source can be found ' +
                             'here: ' + sourceUrl)
        })
    }
})

