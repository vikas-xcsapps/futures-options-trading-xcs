var kite = require("./account_config").kc;
const Instruments = require('./addInstruments');
var progress = 0;

//function to fetch instruments
function getInstruments(exchange) {
    kite.getInstruments(exchange).then(function (response) {

        var size = Object.keys(response).length;
        var sizeMsg = `${size} Instruments Fetched Successfully.`;
        var savingDbMsg = 'Saving Instruments to Database...'

        
        var addedCounter = 0;
        for (var dict of response) {
            addInstrumentsToDB(dict).then(isAdded => {
                addedCounter += 1;
                progress = (addedCounter/size) * 100;
                
            });
        }
    }).catch(function (err) {
        console.log(err);
    })
}

//function to add instruments into db
const addInstrumentsToDB = async (instrumentsData) => {
    try {
        const addInstruments = new Instruments({
            instrument_token: instrumentsData.instrument_token,
            exchange_token: instrumentsData.exchange_token,
            name: instrumentsData.name,
            last_price: instrumentsData.last_price,
            expiry: instrumentsData.expiry,
            strike: instrumentsData.strike,
            tick_size: instrumentsData.tick_size,
            lot_size: instrumentsData.lot_size,
            instrument_type: instrumentsData.instrument_type,
            segment: instrumentsData.segment,
            exchange: instrumentsData.exchange
        });

        const result = await addInstruments.save();
        return result;
    } catch (error) {
        console.log(error);
    }
}

function getProgress(){
    return progress;
}

module.exports = {getInstruments,getProgress}