(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["@cocreate/socket-client", "./message.js"], function(CoCreateSocket, CoCreateMessage) {
        	return factory(true, CoCreateSocket, CoCreateMessage)
        });
    } else if (typeof module === 'object' && module.exports) {
      const CoCreateSocket = require("@cocreate/socket-client/src/")
      const CoCreateMessage = require("./message.js")
      module.exports = factory(false, CoCreateSocket, CoCreateMessage);
    } else {
        root.returnExports = factory(true, root["@cocreate/socket-client"], root["./message.js"]);
  }
}(typeof self !== 'undefined' ? self : this, function (isBrowser, CoCreateSocket, CoCreateMessage) {
  if (isBrowser) {
    let message_socket = new CoCreateSocket('ws');
    CoCreateMessage.setSocket(message_socket);
    CoCreateMessage.createSocket(window.config.host ? window.config.host : window.location.hostname, window.config.organization_Id)
  } 
  return CoCreateMessage;
}));
