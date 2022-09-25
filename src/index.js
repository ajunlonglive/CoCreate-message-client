(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["@cocreate/socket-client"], function(CoCreateSocket) {
            return factory(true, CoCreateSocket);
        });
    }
    else if (typeof module === 'object' && module.exports) {
        const CoCreateSocket = require("@cocreate/socket-client/src/");
        module.exports = factory(false, CoCreateSocket);
    }
    else {
        root.returnExports = factory(true, root["@cocreate/socket-client"]);
    }
}(typeof self !== 'undefined' ? self : this, function(isBrowser, CoCreateSocket) {

    const CoCreateMessage = {
        socket: null,
        
        setSocket: function(socket) {
            this.socket = socket;
            
            if (isBrowser) {
                let socket = window.CoCreateSockets;
    
                if (!socket) {
                    socket = new CoCreateSocket('ws');
                    window.CoCreateSockets = socket;
                }
                
                this.socket = socket;
                this.socket.create(window.config);
                
            }
        },
        
        /*
        CoCreate.message.send({
            namespace: '',
            room: '',
            broadcast: true/false,
            broadcastSender: true/false
            
            rooms: [r1, r2],
            message': 'nice game',
            data': 'let's play a game ....'
         })
        */
        send: function(data) {
            if (!data || !data.data) {
                return;
            }
            this.socket.send('sendMessage', data)
        },

        listen: function(message, fun) {
            this.socket.listen(message, fun);
        },

    }
    
    CoCreateMessage.setSocket()

    return CoCreateMessage;
}));
