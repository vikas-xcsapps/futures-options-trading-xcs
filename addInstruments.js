 const mongoose = require('./database');

 

//Creating schema for futureInstruments
const addFutureInstrumentsSchema = new mongoose.Schema({
    instrument_token: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },

    exchange_token: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    name: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    last_price: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    expiry: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default: Date.now
    },

    strike: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    tick_size: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    lot_size: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default:0
    },
    instrument_type: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    segment: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    exchange: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
});

//Creating Model for addInfo
//Creating collections 
const AddFutureInstrument = new mongoose.model("FutureInstrument", addFutureInstrumentsSchema);

module.exports = AddFutureInstrument;