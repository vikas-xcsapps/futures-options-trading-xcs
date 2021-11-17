const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
const local_host_port = process.env.PORT || 8000;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server, { "cors": { "origin": "*" } });

//Setup View Engine
app.set("view engine", "hbs");


const Instruments = require('./addInstruments');
const FetchInstruments = require('./fetchInstruments');

const checkInstrumentsExist = async (callback) => {
    try {
        const result = await Instruments.find({});
        var size = Object.keys(result).length;
        return callback(size);
    } catch (error) {
        console.log(error);
    }
}

const deleteDatabase = async (callback) => {
    try {
        const result = await Instruments.deleteMany({});
        var size = Object.keys(result).length;
        return callback(size);
    } catch (error) {
        console.log(error);
    }
}



app.get('/', (req, res) => {
    checkInstrumentsExist((size) => {
        console.log(`Instrument size : ${size}`);
        if (size == 0) {
            res.redirect(301, "/updateInstruments");
        } else {
            console.log('Instruments already fetched.')
            res.render('home');
        }
    })

})

app.get('/updateInstruments', (req, res) => {
    res.render('updateInstruments');
})



//Hosting Server
server.listen(server_port, server_host, (req, res) => {
    console.log(`listning on server_port : ${server_port} and server_host ${server_host}`);
});

//Local Host
// server.listen(local_host_port, (req, res) => {
//     console.log(`listning on port : ${local_host_port}`);
// });

socketIO.on('connection', (socket) => {
    console.log("Client connected and it's id is : " + socket.id);

    socket.on('updateInstrument', (data) => {

        deleteDatabase((deletedSize) => {
            console.log(`database deleted , database size ${deletedSize}`);

            console.log('fetch instruments initiated..')
            FetchInstruments.getInstruments("NFO");

            let progressFun = setInterval(function () {
                const progress = getInstrumentProgress();
                var progressInt = parseInt(progress)
                socketIO.emit("progress", progressInt);

                if (progressInt == 100) {
                    clearInterval(progressFun);
                    var finishMsg = 'All Instruments Saved to Database Successfully.';
                    socketIO.emit("message_finish", finishMsg);
                }

            }, 1000);
        });
    })

    socket.on('doSearch', (data) => {
        searchDatabase(data).then(result => {
            
            var size = Object.keys(result).length;
            console.log(size);
            const searchData = {
                "size" : size,
                "search_result" : result 
            }
            socketIO.emit("searchData" , searchData);
        });
    });

});

function getInstrumentProgress() {
    return FetchInstruments.getProgress();
}

const searchDatabase = async (data) => {

    try {
        
        var searchKeyword = {};
        searchKeyword['name'] = data;
        console.log(searchKeyword);
        const searchResult = await Instruments.find(searchKeyword).sort({ strike: 1 });
        return searchResult;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { server };