const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

var KiteConnect = require("kiteconnect").KiteConnect;

const accessToken = process.env.ACCESS_TOKEN;
const apiKey = process.env.API_KEY;

var options = {
	"api_key": apiKey,
	"debug": false
};

var kc = new KiteConnect(options);
kc.setAccessToken(accessToken)

module.exports = {kc};