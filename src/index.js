(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["@cocreate/socket-client"], function(CoCreateSocket) {
            return factory(true, CoCreateSocket)
        });
    }
    else if (typeof module === 'object' && module.exports) {
        const CoCreateSocket = require("@cocreate/socket-client/src/")
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
                    let socket = new CoCreateSocket('ws');
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
           broadcast_sender: true/false
           
           rooms: [r1, r2],
           emit: {
             message': 'nice game',
             data': 'let's play a game ....'
           }
         })
        */
        send: function(data) {
            let request_data = this.socket.getCommonParams();

            if (!data || !data.emit) {
                return;
            }
            request_data = { ...request_data, ...data }

            /** socket parameters **/
            // if (data['broadcast'] === undefined) {
            //   request_data['broadcast'] = true;
            // }
            // if (data['broadcast_sender'] === undefined) {
            //   request_data['broadcast_sender'] = true;
            // }
            const room = this.socket.generateSocketClient(data.namespace, data.room);

            this.socket.send('sendMessage', request_data, room)
        },

        listen: function(message, fun) {
            if (!this.socket)
                this.setSocket()
            this.socket.listen(message, fun);
        },

    }

    return CoCreateMessage;
}));
