const rootSocket = (io) => {
    io.sockets.on('connection', (socket) => {
        
    });
};
exports.default = rootSocket;